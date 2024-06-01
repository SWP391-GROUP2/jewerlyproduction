using JewelryProduction.Core.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;


namespace JewelryProduction.Core.Services
{
    public class UserService : IUserService
    {
           private readonly UserManager<User> um;

        public UserService(UserManager<User> userManager)
        {
            um = userManager;
        }
        public async Task<IdentityResult> RegisterUserAsync(User user)
        {
            IdentityResult result = new IdentityResult();
                User user_ = new User()
                {
                    Name = user.Name,
                    Email = user.Email,
                    DateOfBirth = user.DateOfBirth,
                    PhoneNumber = user.PhoneNumber,
                    Password = user.Password,
                };
                result = await um.CreateAsync(user_, user.Password);
                return result;
            }
    }
}

