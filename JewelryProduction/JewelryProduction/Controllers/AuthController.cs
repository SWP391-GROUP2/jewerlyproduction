using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JewelryProduction.Core.DTO;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using JewelryProduction.Core;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly JewelryProductionContext _context;

        public AuthController(IConfiguration configuration, JewelryProductionContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO userDTO)
        {
            string passwordHash
                = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
            User user = new User
            {
                UserId = Guid.NewGuid().ToString(),
                Name = "Default Name",
                Password = passwordHash,
                Email = userDTO.Email,
                DateOfBirth = DateOnly.FromDateTime(DateTime.MinValue),
                PhoneNumber = 0,
                RoleId = "1",
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDTO userDTO)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == userDTO.Email);
            if (user is null)
            {
                return BadRequest("Email not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(userDTO.Password, user.Password))
            {
                return BadRequest("Invalid password");
            }
            string token = CreateToken(user);
            return Ok(token);
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!
                ));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: cred
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}