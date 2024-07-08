using Firebase.Auth;
using Firebase.Auth.Providers;
using Firebase.Storage;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class _3ddesignController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICloudinaryService _cloudinaryService;

        public _3ddesignController(JewelryProductionContext context, UserManager<AppUser> userManager, ICloudinaryService cloudinaryService)
        {
            _context = context;
            _userManager = userManager;
            _cloudinaryService = cloudinaryService;
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> UploadImage(_3ddesignDTO _design)
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].ToString();
            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwtToken = handler.ReadJwtToken(token);

            var email = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "email")?.Value;
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || string.IsNullOrWhiteSpace(token))
                return BadRequest("Invalid credentials");

            try
            {
                var folder = "3D Designs";
                var avatarUrl = await _cloudinaryService.UploadImageAsync(_design.Image, folder);
                var url = avatarUrl.Url.ToString();

                var design = new _3ddesign
                {
                    _3dDesignId = _design._3dDesignId,
                    DesignName = _design.DesignName,
                    Image = url,
                    CustomizeRequestId = _design.CustomizeRequestId,
                    ProductSampleId = _design.ProductSampleId,
                    DesignStaffId = user.Id
                };
                _context._3ddesigns.Add(design);
                await _context.SaveChangesAsync();
                return Ok("Design uploaded successfully");
            }
            catch (Exception ex) {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private bool _3ddesignExists(string id)
        {
            return _context._3ddesigns.Any(e => e._3dDesignId == id);
        }
    }
}
