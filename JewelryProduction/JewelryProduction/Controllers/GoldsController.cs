using JewelryProduction.Core;
using JewelryProduction.Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoldsController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        public GoldsController(JewelryProductionContext context)
        {
            _context = context;
        }

        // GET: api/Golds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gold>>> GetGolds()
        {
            return await _context.Golds.ToListAsync();
        }

        // GET: api/Golds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gold>> GetGold(string id)
        {
            var gold = await _context.Golds.FindAsync(id);

            if (gold == null)
            {
                return NotFound();
            }

            return gold;
        }

        // PUT: api/Golds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGold(string id, Gold gold)
        {
            if (id != gold.GoldId)
            {
                return BadRequest();
            }

            _context.Entry(gold).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoldExists(id))
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

        // POST: api/Golds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Gold>> PostGold(GoldDTO golddto)
        {
            Gold gold = new Gold
            {
                GoldId = golddto.GoldId,
                GoldType = golddto.GoldType,
                Weight = golddto.Weight,
                PricePerGram = golddto.PricePerGram,
            };
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GoldExists(golddto.GoldId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGold", new { id = golddto.GoldId }, golddto);
        }

        // DELETE: api/Golds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGold(string id)
        {
            var gold = await _context.Golds.FindAsync(id);
            if (gold == null)
            {
                return NotFound();
            }

            _context.Golds.Remove(gold);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GoldExists(string id)
        {
            return _context.Golds.Any(e => e.GoldId == id);
        }
    }
}
