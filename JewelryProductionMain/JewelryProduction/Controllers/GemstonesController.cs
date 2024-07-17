using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface.GemstoneF;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GemstonesController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly IGemstoneService _service;

        public GemstonesController(JewelryProductionContext context, IGemstoneService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/Gemstones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gemstone>>> GetGemstones()
        {
            var result = await _service.GetGemstones();
            return Ok(result);
        }

        // GET: api/Gemstones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gemstone>> GetGemstone(string id)
        {
            var result = await _service.GetGemstone(id);
            return Ok(result);
        }

        // PUT: api/Gemstones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGemstone(string id, GemstoneDTO gemstoneDTO)
        {
            if (id != gemstoneDTO.GemstoneId)
            {
                return BadRequest();
            }

            var updateGem = await _context.Gemstones.FindAsync(id);
            updateGem.Name = gemstoneDTO.Name;
            updateGem.Color = gemstoneDTO.Color;
            updateGem.CaratWeight = gemstoneDTO.CaratWeight;
            updateGem.Shape = gemstoneDTO.Shape;
            updateGem.Size = gemstoneDTO.Size;
            updateGem.Cut = gemstoneDTO.Cut;
            updateGem.Clarity = gemstoneDTO.Clarity;
            updateGem.Price = gemstoneDTO.Price;
            updateGem.ProductSampleId = gemstoneDTO.ProductSampleId;
            updateGem.CustomizeRequestId = gemstoneDTO.CustomizeRequestId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GemstoneExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Gemstones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostGemstone(AddGemstoneDTO gemstone)
        {
            try
            {
                var result = await _service.UploadGemstoneAsync(gemstone);
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

        // DELETE: api/Gemstones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGemstone(string id)
        {
            var gemstone = await _context.Gemstones.FindAsync(id);
            if (gemstone == null)
            {
                return NotFound();
            }

            _context.Gemstones.Remove(gemstone);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("find")]
        public async Task<ActionResult<List<Gemstone>>> FindGemstones([FromBody] GemstoneDTO gemstoneDTO)
        {
            var gemstones = await _context.Gemstones
                .Where(g => g.Name == gemstoneDTO.Name && (
                            g.Shape == gemstoneDTO.Shape ||
                            g.Clarity == gemstoneDTO.Clarity ||
                            g.Color == gemstoneDTO.Color ||
                            g.Size == gemstoneDTO.Size ||
                            g.CaratWeight == gemstoneDTO.CaratWeight))
                .ToListAsync();

            return Ok(gemstones);
        }

        [HttpGet("Filter Gemstone")]
        public async Task<ActionResult<IEnumerable<Gemstone>>> FilterGemstone(string? shape, string? clarity, double? size, string? colors, double? caraMin, double? caraMax, string? categoryName)
        {
            var query = _context.Gemstones.AsQueryable();
            if (!string.IsNullOrEmpty(shape)) query = query.Where(sv => sv.Shape.Contains(shape));
            if (!string.IsNullOrEmpty(clarity)) query = query.Where(sv => sv.Clarity.Contains(clarity));
            if (size.HasValue) query = query.Where(sv => sv.Size == size);
            if (!string.IsNullOrEmpty(colors)) query = query.Where(sv => sv.Color.Contains(colors));
            if (caraMin.HasValue) query = query.Where(sv => sv.CaratWeight >= caraMin);
            if (caraMax.HasValue) query = query.Where(sv => sv.CaratWeight <= caraMax);

            if (!string.IsNullOrEmpty(categoryName))
            {
                query = from gemstone in query
                        join category in _context.Categories
                        on gemstone.CategoryId equals category.CategoryId
                        where category.CategoryName.Contains(categoryName)
                        select gemstone;
            }

            var result = await query.ToListAsync();
            return Ok(result);

        }

        private bool GemstoneExists(string id)
        {
            return _context.Gemstones.Any(e => e.GemstoneId == id);
        }
    }
}
