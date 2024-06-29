using JewelryProduction.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CloudinaryController : ControllerBase
    {
        private readonly ICloudinaryService _cloudinaryService;
        public CloudinaryController(ICloudinaryService cloudinaryService)
        {
            _cloudinaryService = cloudinaryService;
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
        {
            var url = await _cloudinaryService.UploadImageAsync(file);
            return Ok(new { url });
        }   
    }
}
