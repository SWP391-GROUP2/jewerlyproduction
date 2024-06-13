using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoldsController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private static readonly HttpClient client = new HttpClient();
        public GoldsController(JewelryProductionContext context)
        {
            _context = context;
        }

        [HttpGet("GoldAPI")]
        public async Task<IActionResult> GetBTMCPrice()
        {
            string url = "https://webtygia.com/api/vang?bgheader=b53e3e";
            HttpResponseMessage response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                return Ok(data);
            }
            else
            {
                return StatusCode((int)response.StatusCode, response.ReasonPhrase);
            }
        }
        //public async Task<IActionResult> GetGoldPrice()
        //{
        //    // Lấy token JWT
        //    var client = new RestClient(_tokenUrl);
        //    var tokenRequest = new RestRequest()
        //        .AddHeader("Authorization", $"Bearer {_apiKey}");

        //    var tokenResponse = await client.ExecuteAsync(tokenRequest, Method.Get);

        //    if (!tokenResponse.IsSuccessful)
        //    {
        //        return StatusCode((int)tokenResponse.StatusCode, tokenResponse.StatusDescription);
        //    }

        //    // Giả định phản hồi token có định dạng { "results": "token_value" }
        //    var tokenResult = JsonSerializer.Deserialize<DTO.TokenResponse>(tokenResponse.Content);
        //    var token = tokenResult.results;

        //    // Sử dụng token JWT để yêu cầu dữ liệu giá vàng
        //    var goldClient = new RestClient(_goldPriceUrl);
        //    var goldRequest = new RestRequest()
        //        .AddHeader("Authorization", $"Bearer {token}");

        //    var goldResponse = await goldClient.ExecuteAsync(goldRequest, Method.Get);

        //    if (goldResponse.IsSuccessful)
        //    {
        //        return Ok(goldResponse.Content);
        //    }
        //    else
        //    {
        //        return StatusCode((int)goldResponse.StatusCode, goldResponse.StatusDescription);
        //    }
        //}


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
        public async Task<IActionResult> PutGold(string id, GoldDTO goldDTO)
        {
            if (id != goldDTO.GoldId)
            {
                return BadRequest();
            }

            var updateGold = await _context.Golds.FindAsync(id);
            updateGold.GoldType = goldDTO.GoldType;
            updateGold.Weight = goldDTO.Weight;
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

        // POST: api/Golds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Gold>> PostGold(GoldDTO goldDTO)
        {
            Gold gold = new Gold
            {
                GoldId = goldDTO.GoldId,
                GoldType = goldDTO.GoldType,
                Weight = goldDTO.Weight,
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
