using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JewelryProduction.API.Model;
using Microsoft.AspNetCore.Identity.Data;
namespace JewelryProduction.Application.System
{
    internal interface IUserService
    {
        Task<bool> authencate(API.Model.LoginRequest request);
        Task<bool> register(RegisterRequest request);
    }
}
