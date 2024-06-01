using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JewelryProduction.Core.Interface
{
    public interface IUserRepository
    {
        Task<IdentityResult> CreateUserAsync(User user, string password);
        Task<IdentityUser> GetUserByUsernameAsync(string username);
    }
}
