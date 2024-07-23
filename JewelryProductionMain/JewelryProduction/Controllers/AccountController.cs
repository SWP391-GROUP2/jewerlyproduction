using Firebase.Auth;
using Google.Apis.Auth;
using JewelryProduction.DTO.Account;
using JewelryProduction.Interface;
using JewelryProduction.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailService _emailService;
        private readonly ICloudinaryService _cloudinaryService;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager, IEmailService emailService, ICloudinaryService cloudinaryService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _emailService = emailService;
            _cloudinaryService = cloudinaryService;
        }

        [HttpPost("register/Staff")]
        public async Task<IActionResult> RegisterStaff([FromBody] RegisterStaffDTO registerDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = new AppUser
                {
                    Email = registerDTO.Email,
                    UserName = registerDTO.Email,
                    Name = registerDTO.Name,
                    PhoneNumber = registerDTO.PhoneNumber,
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(user, registerDTO.Password);
                if (result.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, registerDTO.Role);
                    if (roleResult.Succeeded)
                    {
                        var refreshToken = _tokenService.CreateRefreshToken();
                        await _userManager.SetAuthenticationTokenAsync(user, "JewelryProduction", "RefreshToken", refreshToken);
                        return Ok(
                                new NewUserDTO
                                {
                                    Email = user.Email,
                                    Token = await _tokenService.CreateAccessToken(user),
                                    RefreshToken = refreshToken
                                }
                            );
                    }
                    else
                    {
                        return BadRequest("Role Error");
                    }
                }
                else
                {
                    return BadRequest("Create Error");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("register/Customer")]
        public async Task<IActionResult> RegisterCustomer([FromBody] RegisterCustomerDTO registerDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = new AppUser
                {
                    Email = registerDTO.Email,
                    UserName = registerDTO.Email,
                    Name = registerDTO.Name,
                    PhoneNumber = registerDTO.PhoneNumber

                };

                if (await _userManager.FindByEmailAsync(registerDTO.Email) is not null){
                    return StatusCode(412, new { message = "Account already exists." });
                }

                var result = await _userManager.CreateAsync(user, registerDTO.Password);
                if (result.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "Customer");
                    if (roleResult.Succeeded)
                    {
                        var refreshToken = _tokenService.CreateRefreshToken();
                        await _userManager.SetAuthenticationTokenAsync(user, "JewelryProduction", "RefreshToken", refreshToken);
                        return Ok(
                                new NewUserDTO
                                {
                                    Email = user.Email,
                                    Token = await _tokenService.CreateAccessToken(user),
                                    isPasswordSet = true,
                                    RefreshToken = refreshToken,
                                }
                            );
                    }
                    else
                        return BadRequest("Role Error");
                }
                else
                    return BadRequest("Create Error");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null)
                return Unauthorized("Invalid Email");

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return Ok(new NewUserDTO
                {
                    isPasswordSet = true,
                    Email = user.Email,
                    Token = await _tokenService.CreateAccessToken(user),
                    RefreshToken = _tokenService.CreateRefreshToken(),
                    EmailVerify = user.EmailConfirmed
                });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
            if (!result.Succeeded) return Unauthorized("Email not found & Invalid Password");

            var confirmed = await _userManager.IsEmailConfirmedAsync(user);

            var role = await _userManager.GetRolesAsync(user);
            var refreshToken = _tokenService.CreateRefreshToken();
            await _userManager.SetAuthenticationTokenAsync(user, "JewelryProduction", "RefreshToken", refreshToken);
            var isPasswordSet = user.PasswordHash == null ? false : true;

            return Ok(new NewUserDTO
            {
                isPasswordSet = isPasswordSet,
                Email = user.Email,
                Token = await _tokenService.CreateAccessToken(user),
                RefreshToken = refreshToken,
                EmailVerify = user.EmailConfirmed
            }
            );
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Logout Successful");
        }

        [HttpPost("deactivate-user")]
        public async Task<IActionResult> DeactivateUser([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("User ID must be provided.");
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.LockoutEnabled = true;
            user.LockoutEnd = DateTime.MaxValue;
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok("User successfully banned.");
            }

            // Log the specific errors if needed
            var errorMessages = string.Join(", ", result.Errors.Select(e => e.Description));
            return BadRequest($"Failed to ban user: {errorMessages}");
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDTO refreshTokenDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var principal = _tokenService.GetPrincipalFromExpiredToken(refreshTokenDTO.Token);
            var user = await _userManager.FindByNameAsync(principal.Identity.Name);

            if (user == null || !await _tokenService.ValidateRefreshToken(user, refreshTokenDTO.RefreshToken))
                return Unauthorized();

            var newJwtToken = _tokenService.CreateAccessToken(user);
            var newRefreshToken = _tokenService.CreateRefreshToken();

            await _userManager.SetAuthenticationTokenAsync(user, "MyApp", "RefreshToken", newRefreshToken);

            return Ok(new NewUserDTO
            {
                Email = user.Email,
                Token = await newJwtToken,
                RefreshToken = newRefreshToken
            });
        }

        [HttpGet("Get-Profile")]
        public async Task<IActionResult> GetProfile()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].ToString();
            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwtToken = handler.ReadJwtToken(token);

            var email = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "email")?.Value;
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || string.IsNullOrWhiteSpace(token))
                return BadRequest("Invalid credentials");

            var profile = new UserProfileDTO()
            {
                Name = user.Name,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                DateOfBirth = user.DateOfBirth,
                Avatar = user.Avatar
            };
            return Ok(profile);
        }

        [HttpPut("Update-Profile")]
        public async Task<IActionResult> UpdateProfile(UpdateUserProfileDTO updateProfile)
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].ToString();
            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwtToken = handler.ReadJwtToken(token);

            var email = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "email")?.Value;
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || string.IsNullOrWhiteSpace(token))
                return BadRequest("Invalid credentials");
             
            user.Name = updateProfile.Name;
            user.PhoneNumber = updateProfile.PhoneNumber;

            user.DateOfBirth = DateOnly.Parse(updateProfile.DateOfBirth);

            if (updateProfile.Avatar != null)
            {
                var folder = "Avatar";
                var avatarUrl = await _cloudinaryService.UploadImageAsync(updateProfile.Avatar, folder);
                var url = avatarUrl.Url.ToString();
                user.Avatar = url;
            }

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                var updatedUserProfile = new UserProfileDTO()
                {
                    Name = user.Name,
                    PhoneNumber = user.PhoneNumber,
                    Email = email,
                    DateOfBirth = user.DateOfBirth,
                    Avatar = user.Avatar
                };
                return Ok(updatedUserProfile);
            }
            return BadRequest("Failed to update profile");
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePasswordAsync(SetPasswordDTO _setPassword)
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].ToString();
            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwtToken = handler.ReadJwtToken(token);

            var email = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "email")?.Value;

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || string.IsNullOrWhiteSpace(token))
                return BadRequest("Invalid credentials");

            var curPassword = _setPassword.CurrentPassword;
            var newPassword = _setPassword.Password;
            if (newPassword != _setPassword.ConfirmPassword)
                return BadRequest("Passwords do not match");
            var passwordCheck = await _userManager.CheckPasswordAsync(user, curPassword);
            if (!passwordCheck)
            {
                return BadRequest("Incorrect current password.");
            }

            // Update the user with the new password hash
            var result = await _userManager.ChangePasswordAsync(user, curPassword, newPassword);

            if (result.Succeeded)
                return Ok("password changes");
            return BadRequest("Failed to change password");
        }

        [HttpPost("Forgot-password-email")]
        public async Task<IActionResult> ForgotPasswordInsertEmail([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return Unauthorized("Invalid Email");
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Uri.EscapeDataString(token);
            var message = new MessageOTP(
                new string[] { email },
                "Reset Password",
                $@"
                <h1>Reset Password</h1>
                <p>Dear {email},</p>
                <p>Click the link below to reset your password:</p>
                <p><a href='https://nbjewelryfe.azurewebsites.net/forgetpasswordverify?email={email}&token={encodedToken}'>Reset Password</a></p>
                <p>If you did not request this code, please ignore this email.</p>
                <p>Best regards,</p>
                <p>Jewelry Production </p>
                <p>&copy; 2024 Jewelry Production. All rights reserved.</p>");
            _emailService.SendEmail(message);
            return Ok("Token sent");
        }

        [HttpPost("Forget-password-change")]
        public async Task<IActionResult> ForgotPasswordInsertEmail(ForgetPasswordDTO forgetPassword)
        {
            var user = await _userManager.FindByEmailAsync(forgetPassword.email);
            if (user == null)
                return BadRequest("Invalid Email");
            var resetToken = forgetPassword.resetToken;
            var password = forgetPassword.password;
            var confirmPassword = forgetPassword.confirmPassword;
            if (!password.Equals(confirmPassword))
                return BadRequest("Passwords do not match");

            var result = await _userManager.ResetPasswordAsync(user, resetToken, password);
            if (!result.Succeeded)
                return BadRequest("Invalid Token");
            return Ok("Password changed");
        }
        [HttpGet("current-user-id")]
        public IActionResult GetCurrentUserId()
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sid);
            if (userId == null)
            {
                return Unauthorized("User ID not found.");
            }
            return Ok(new { UserId = userId });
        }
    }
}