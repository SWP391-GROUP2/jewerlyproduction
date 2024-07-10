using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        public AdminController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("GetAllUser")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllUser()
        {
            //return await _userManager.Users.ToListAsync();
            var users = await _userManager.Users.ToListAsync();

            var filteredUsers = new List<AppUser>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (!roles.Contains("Admin") && !roles.Contains("Customer"))
                {
                    filteredUsers.Add(user);
                }
            }

            return Ok(filteredUsers);
        }


        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }
            user.EmailConfirmed = false;
            _userManager.UpdateAsync(user);
            return Ok(user);
        }
    }

}

