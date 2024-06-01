using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController(SignInManager<User> sm, UserManager<User> um) : ControllerBase
    {
        private readonly SignInManager<User> signInManager = sm;
        private readonly UserManager<User> userManager = um;

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(User user)
        {
            string ms = "";
            IdentityResult result = new IdentityResult();
            try
            {
                User user_ = new User()
                {
                    Name = user.Name,
                    Email = user.Email,
                    DateOfBirth = user.DateOfBirth,
                    PhoneNumber = user.PhoneNumber,
                    Password = user.Password,
                };
                result = await userManager.CreateAsync(user_);
                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }
                ms = "Register successfully";
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong. Please try again");
            }
            return Ok(new { ms = ms, result = result });
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
