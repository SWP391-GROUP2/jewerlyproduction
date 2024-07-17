using JewelryProduction.DTO;
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

            var filteredUsers = new List<UserWithRoleDTO>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (!roles.Contains("Admin") && !roles.Contains("Customer"))
                {
                    filteredUsers.Add(new UserWithRoleDTO
                    {
                        UserId = user.Id,
                        UserName = user.UserName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        EmailConfirmed = user.EmailConfirmed,
                        Roles = roles.ToList()
                    });
                }
            }

            return Ok(filteredUsers);
        }


        [HttpPut("DeleteUser")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }
            user.EmailConfirmed = false;
            await _userManager.UpdateAsync(user);
            return Ok(user);
        }

        [HttpGet("GetUserByRole")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUserByRole(string role)
        {
            var usersInRole = new List<UserWithRoleDTO>();

            // Lấy tất cả người dùng trong vai trò cụ thể
            var users = await _userManager.GetUsersInRoleAsync(role);

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                usersInRole.Add(new UserWithRoleDTO
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    EmailConfirmed = user.EmailConfirmed,
                    Roles = roles.ToList()
                });
            }

            return Ok(usersInRole);
        }

        [HttpGet("total")]
        public async Task<IActionResult> GetTotalUsers()
        {
            var totalUsers = await _userManager.Users.CountAsync();
            return Ok(totalUsers);
        }

        [HttpGet("email-confirmed")]
        public async Task<IActionResult> GetEmailConfirmedUsers()
        {
            var emailConfirmedUsers = await _userManager.Users
                .Where(u => u.EmailConfirmed)
                .CountAsync();
            return Ok(emailConfirmedUsers);
        }

        [HttpGet("locked-out")]
        public async Task<IActionResult> GetLockedOutUsers()
        {
            var lockedOutUsers = await _userManager.Users
                .Where(u => u.LockoutEnd.HasValue && u.LockoutEnd > DateTimeOffset.UtcNow)
                .CountAsync();
            return Ok(lockedOutUsers);
        }
        [HttpGet("phone-number-confirmed")]
        public async Task<IActionResult> GetPhoneNumberConfirmedUsers()
        {
            var phoneNumberConfirmedUsers = await _userManager.Users
                .Where(u => u.PhoneNumberConfirmed)
                .CountAsync();
            return Ok(phoneNumberConfirmedUsers);
        }

    }

}

