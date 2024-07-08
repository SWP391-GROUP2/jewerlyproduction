using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gold>>> GetGolds()
        {
            return await _context.Golds.ToListAsync();
        }


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


        [HttpPut("{id}")]
        public async Task<IActionResult> PutGold(string id, GoldDTO goldDTO)
        {
            if (id != goldDTO.GoldId)
            {
                return BadRequest();
            }

            var updateGold = await _context.Golds.FindAsync(id);
            updateGold.GoldType = goldDTO.GoldType;
            updateGold.PricePerGram = goldDTO.PricePerGram;

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

        [HttpPut("UpdateGoldPrice")]
        public async Task<IActionResult> UpdatePricePerGram(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);

                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets[0]; // Assuming data is in the first worksheet
                    var rowCount = worksheet.Dimension.Rows;
                    //var rowCount = 9;

                    for (int row = 2; row <= rowCount; row++) // Assuming the first row is header
                    {
                        var goldType = worksheet.Cells[row, 1].Value.ToString();
                        var pricePerGram = double.Parse(worksheet.Cells[row, 3].Value.ToString());

                        var gold = _context.Golds.FirstOrDefault(g => g.GoldType == goldType);
                        if (gold != null)
                        {
                            gold.PricePerGram = pricePerGram;
                        }
                    }

                    await _context.SaveChangesAsync();
                }
            }

            return Ok("Prices updated successfully.");
        }


        [HttpPost]
        public async Task<ActionResult<Gold>> PostGold(GoldDTO goldDTO)
        {
            Gold gold = new Gold
            {
                GoldId = goldDTO.GoldId,
                GoldType = goldDTO.GoldType,
                PricePerGram = goldDTO.PricePerGram,
            };
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GoldExists(gold.GoldId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGold", new { id = gold.GoldId }, gold);
        }


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
