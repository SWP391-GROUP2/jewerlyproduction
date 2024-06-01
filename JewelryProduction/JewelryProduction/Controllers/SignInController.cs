using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using JewelryProduction.Core;
using JewelryProduction.Core.Interface;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController(SignInManager<User> sm, UserManager<User> um) : ControllerBase
    {
        private readonly SignInManager<User> signInManager = sm;
        private readonly UserManager<User> userManager = um;
        private readonly IUserService _userService;

        public SignInController(SignInManager<User> signInManager, UserManager<User> userManager, IUserService userService) : this(signInManager, userManager)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(User user)
        {
            try
            {
                var result = await _userService.RegisterUserAsync(user);

                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                return Ok(new { ms = "Register successfully", result });
            }
            catch (Exception ex)
            {
                // Log the exception (ex) as needed
                return BadRequest("Something went wrong. Please try again");
            }
        }
        [HttpGet("logout"), Authorize]
        public async Task<ActionResult> LogoutUser()
        {

            try
            {
                await signInManager.SignOutAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Someting went wrong, please try again. " + ex.Message });
            }

            return Ok(new { message = "You are free to go!" });
        }
    }
}
