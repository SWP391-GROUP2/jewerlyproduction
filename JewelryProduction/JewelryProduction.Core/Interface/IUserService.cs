using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JewelryProduction.Core.Interface
{
    public interface IUserService
    {
        Task<IdentityResult> RegisterUserAsync(User user);
        
        }
}
