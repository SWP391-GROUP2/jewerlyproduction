using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Mvc;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class _3ddesignController : ControllerBase
    {
        private readonly I3dDesignService _designService;

        public _3ddesignController(I3dDesignService designService)
        {
            _designService = designService;
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> UploadImage(_3ddesignDTO design)
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].ToString();
            var token = authorizationHeader.Substring("Bearer ".Length).Trim();

            if (string.IsNullOrWhiteSpace(token))
                return BadRequest("Token is required");

            try
            {
                var result = await _designService.UploadDesignAsync(design, token);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var result = await _designService.Get_3Ddesigns();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(string id)
        {
            var result = await _designService.Get_3Ddesign(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}