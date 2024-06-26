using Google.Apis.Auth;
using JewelryProduction.DTO.Account;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleAuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;


        public GoogleAuthController(UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleUserLoginDTO googleLoginDTO)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(googleLoginDTO.Token, new GoogleJsonWebSignature.ValidationSettings());
            if (payload == null)
                return BadRequest("Invalid Id Token");

            var user = await _userManager.FindByEmailAsync(payload.Email);

            if (user == null)
            {
                user = new AppUser
                {
                    Email = payload.Email,
                    UserName = payload.Email,
                    Name = payload.Name,
                    Avatar = payload.Picture,
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded) return BadRequest("Failed to create user");
                var roleResult = await _userManager.AddToRoleAsync(user, "Customer");

                var info = new UserLoginInfo("Google", payload.Subject, "Google");
                var loginResult = await _userManager.AddLoginAsync(user, info);
                if (!loginResult.Succeeded) return BadRequest("Failed to add external login");
            }

            var PasswordSet = user.PasswordHash == null ? false : true;

            var refreshToken = _tokenService.CreateRefreshToken();
            await _userManager.SetAuthenticationTokenAsync(user, "JewelryProduction", "RefreshToken", refreshToken);

            return Ok(new NewUserDTO
            {
                Email = payload.Email,
                isPasswordSet = PasswordSet,
                Token = await _tokenService.CreateAccessToken(user),
                RefreshToken = refreshToken
            });
        }

        [HttpPost("google-setPassword")]
        public async Task<IActionResult> GoogleSetPassword([FromBody] SetPasswordDTO setPasswordDTO, [FromHeader(Name = "Authorization")] string authorizationHeader)
        {
            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return BadRequest("Invalid authorization header");
            }

            var token = authorizationHeader.Substring("Bearer ".Length).Trim();

            var handler = new JwtSecurityTokenHandler();

            if (!handler.CanReadToken(token))
            {
                return BadRequest("Invalid token format");
            }

            JwtSecurityToken jwtToken;
            try
            {
                jwtToken = handler.ReadJwtToken(token);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error reading token: {ex.Message}");
            }

            var email = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "email")?.Value;

            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email claim not found in token");
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (setPasswordDTO.Password != setPasswordDTO.ConfirmPassword)
            {
                return BadRequest("Passwords do not match");
            }

            var result = await _userManager.AddPasswordAsync(user, setPasswordDTO.Password);
            if (!result.Succeeded)
            {
                return BadRequest("Failed to set password");
            }

            return Ok("Password set successfully");
        }

    }
}
