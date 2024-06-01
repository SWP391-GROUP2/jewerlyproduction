using JewelryProduction.Core.Interface;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JewelryProduction.Core.Repositories
{
    internal class UserRepository : IUserRepository
    {
        private readonly UserManager<User> um;

        public UserRepository(UserManager<User> userManager)
        {
            um = userManager;
        }

        public async Task<IdentityResult> CreateUserAsync(User user, string password)
        {
            return await um.CreateAsync(user, password);
        }

        public async Task<IdentityUser> GetUserByUsernameAsync(string username)
        {
            return await um.FindByNameAsync(username);
        }
        public async Task<IdentityResult> UpdateUserAsync(User user)
        {
            return await um.UpdateAsync(user);
        }

        public async Task<string> GeneratePasswordResetTokenAsync(User user)
        {
            return await um.GeneratePasswordResetTokenAsync(user);
        }

        public async Task<IdentityResult> ResetPasswordAsync(User user, string token, string newPassword)
        {
            return await um.ResetPasswordAsync(user, token, newPassword);
        }
    }
}
