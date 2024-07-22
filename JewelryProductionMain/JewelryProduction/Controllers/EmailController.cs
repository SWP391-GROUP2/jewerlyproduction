using JewelryProduction.DTO.Account;
using JewelryProduction.Interface;
using JewelryProduction.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OtpNet;
using System.IdentityModel.Tokens.Jwt;
using static System.Net.WebRequestMethods;

namespace JewelryProduction.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailService _emailService;
        private AccToolsService _accTools;

        public EmailController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager, IEmailService emailService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _emailService = emailService;
        }

        private static Dictionary<string, OtpEntry> otpStorage = new Dictionary<string, OtpEntry>();

        [HttpGet("SendOTP")]
        public async Task<IActionResult> SendOTP()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].ToString();
            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwtToken = handler.ReadJwtToken(token);

            var email = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "email")?.Value;

            var secretKey = KeyGeneration.GenerateRandomKey(20);
            var base32Secret = Base32Encoding.ToString(secretKey);
            var totp = new Totp(secretKey);
            var otp = totp.ComputeTotp(DateTime.UtcNow);

            otpStorage[email] = new OtpEntry
            {
                Base32Secret = base32Secret,
                TimeStamp = DateTime.UtcNow
            };

            var message = new MessageOTP(
            new string[] { email },
            "Your One-Time Password (OTP)",
            $@"
    <h1>OTP Verification</h1>
    <p>Dear {email},</p>
    <p>Thank you for registering with us. To complete your verification, please use the following One-Time Password (OTP):</p>
    <p><strong>{otp}</strong></p>
    <p>This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
    <p>If you did not request this code, please ignore this email.</p>
    <p>Best regards,</p>
    <p>Jewelry Production </p>
    <p>&copy; 2024 Jewelry Production. All rights reserved.</p>");

            _emailService.SendEmail(message);
            return Ok("OTP sent");
        }
        [HttpGet("SendEmail")]
        public async Task<IActionResult> SendEmail(string userId, string senderId, string content)
        {

            try
            {
                await _emailService.SendEmail(userId, senderId, content);
                return Ok("OTP sent");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VerifyOTP")]
        public async Task<IActionResult> VerifyOTP([FromBody] OTPVerificationRequest request)
        {
            if (otpStorage.TryGetValue(request.Email, out var otpEntry))
            {
                TimeSpan expirationTime = TimeSpan.FromMinutes(10);

                if (DateTime.UtcNow - otpEntry.TimeStamp > expirationTime)
                {
                    otpStorage.Remove(request.Email);
                    return Unauthorized("OTP has expired");
                }

                var user = await _userManager.FindByEmailAsync(request.Email);
                var check = user.EmailConfirmed = true;
                await _userManager.UpdateAsync(user);

                var secretKey = Base32Encoding.ToBytes(otpEntry.Base32Secret);
                var totp = new Totp(secretKey);
                bool isValid = totp.VerifyTotp(request.OTP, out long timeStepMatched, new VerificationWindow(2, 2));

                if (isValid)
                    return Ok($"EmailConfirmed{check}");
                else
                    return Unauthorized("Invalid OTP");
            }
            else
                return NotFound("OTP request not found");
        }
    }
}