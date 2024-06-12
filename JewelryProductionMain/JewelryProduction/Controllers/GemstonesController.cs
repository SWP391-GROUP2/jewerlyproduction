using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GemstonesController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        public GemstonesController(JewelryProductionContext context)
        {
            _context = context;
        }

        // GET: api/Gemstones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gemstone>>> GetGemstones()
        {
            return await _context.Gemstones.ToListAsync();
        }

        // GET: api/Gemstones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gemstone>> GetGemstone(string id)
        {
            var gemstone = await _context.Gemstones.FindAsync(id);

            if (gemstone == null)
            {
                return NotFound();
            }

            return gemstone;
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
            updateGem.Cut = gemstoneDTO.Cut;
            updateGem.Clarity = gemstoneDTO.Clarity;
            updateGem.PricePerCarat = gemstoneDTO.PricePerCarat;
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
        public async Task<ActionResult<Gemstone>> PostGemstone(GemstoneDTO gemstoneDTO)
        {

            Gemstone gemstone = new Gemstone
            {
                GemstoneId = gemstoneDTO.GemstoneId,
                Name = gemstoneDTO.Name,
                Color = gemstoneDTO.Color,
                CaratWeight = gemstoneDTO.CaratWeight,
                Cut = gemstoneDTO.Cut,
                Clarity = gemstoneDTO.Clarity,
                PricePerCarat = gemstoneDTO.PricePerCarat,
                ProductSampleId = gemstoneDTO.ProductSampleId,
                CustomizeRequestId = gemstoneDTO.CustomizeRequestId,

            };
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GemstoneExists(gemstone.GemstoneId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGemstone", new { id = gemstone.GemstoneId }, gemstone);
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

        private bool GemstoneExists(string id)
        {
            return _context.Gemstones.Any(e => e.GemstoneId == id);
        }
    }
}
