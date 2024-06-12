using Google.Apis.Auth;
using JewelryProduction.DTO.Account;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
            var payload = await GoogleJsonWebSignature.ValidateAsync(googleLoginDTO.IdToken, new GoogleJsonWebSignature.ValidationSettings());
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
                };

                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded) return BadRequest("Failed to create user");

                var info = new UserLoginInfo("Google", payload.Subject, "Google");
                var loginResult = await _userManager.AddLoginAsync(user, info);
                if (!loginResult.Succeeded) return BadRequest("Failed to add external login");
            }

            return Ok(new NewUserDTO
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            });
        }
    }
}
