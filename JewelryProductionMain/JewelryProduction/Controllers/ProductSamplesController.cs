using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSamplesController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        public ProductSamplesController(JewelryProductionContext context)
        {
            _context = context;
        }

        // GET: api/ProductSamples
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductSample>>> GetProductSamples()
        {
            return await _context.ProductSamples.ToListAsync();
        }

        // GET: api/ProductSamples/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductSample>> GetProductSample(string id)
        {
            var productSample = await _context.ProductSamples.FindAsync(id);

            if (productSample == null)
            {
                return NotFound();
            }

            return productSample;
        }

        // GET: api/ProductSamples/5
        [HttpGet("FilterInSearch")]
        public async Task<ActionResult<IEnumerable<ProductSample>>> GetFilter(string type, string style, string sortPrice) // Filter in search
        {
            // check whether type or style is null
            var productSamples = _context.ProductSamples.AsQueryable();
            if (type is null)
                productSamples = productSamples.Where(p => p.Type == type);
            else if (style is null)
                productSamples = productSamples.Where(p => p.Style == style);
            else
                productSamples = productSamples.Where(p => p.Type == type && p.Style == style);

            // Check the sort in price.
            if (sortPrice is null) sortPrice = "asc";

            productSamples = sortPrice.ToLower() == "asc" ? productSamples.OrderBy(p => p.Price) : productSamples.OrderByDescending(p => p.Price);
            var result = await productSamples.ToListAsync();
            return Ok(result);
        }





        // PUT: api/ProductSamples/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductSample(string id, ProductSampleDTO productSampleDTO)
        {
            if (id != productSampleDTO.ProductSampleId)
            {
                return BadRequest();
            }
            var updateProduct = await _context.ProductSamples.FindAsync(id);
            updateProduct.ProductName = productSampleDTO.ProductName;
            updateProduct.Type = productSampleDTO.Type;
            updateProduct.Style = productSampleDTO.Style;
            updateProduct.Size = productSampleDTO.Size;
            updateProduct.Price = productSampleDTO.Price;
            updateProduct.GoldId = productSampleDTO.GoldId;
            //chua update hinh anh duoc
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductSampleExists(id))
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

        // POST: api/ProductSamples
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductSample>> PostProductSample(ProductSampleDTO productSampleDTO)
        {

            var productSample = new ProductSample
            {
                ProductSampleId = productSampleDTO.ProductSampleId,
                ProductName = productSampleDTO.ProductName,
                Type = productSampleDTO.Type,
                Style = productSampleDTO.Style,
                Size = productSampleDTO.Size,
                Price = productSampleDTO.Price,
                GoldId = productSampleDTO.GoldId,
            };
            _context.ProductSamples.Add(productSample);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductSampleExists(productSample.ProductSampleId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProductSample", new { id = productSample.ProductSampleId }, productSample);
        }

        [HttpPost("uploadwithfile")]
        public async Task<ActionResult<ProductSample>> PostWithImages(ProductSampleDTO productSampleDTO)
        {

            var productSample = new ProductSample
            {
                ProductSampleId = productSampleDTO.ProductSampleId,
                ProductName = productSampleDTO.ProductName,
                Type = productSampleDTO.Type,
                Style = productSampleDTO.Style,
                Size = productSampleDTO.Size,
                Price = productSampleDTO.Price,
                GoldId = productSampleDTO.GoldId,
            };
            _context.ProductSamples.Add(productSample);
            //with picture
            if (productSampleDTO.Image.Length > 0)
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", productSampleDTO.Image.FileName);
                using (var stream = System.IO.File.Create(path))
                {
                    await productSampleDTO.Image.CopyToAsync(stream);
                }
                productSample.Image = "/images" + productSampleDTO.Image.FileName;
            }
            else
                productSample.Image = "";
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductSampleExists(productSample.ProductSampleId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProductSample", new { id = productSample.ProductSampleId }, productSample);
        }

        // DELETE: api/ProductSamples/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductSample(string id)
        {
            var productSample = await _context.ProductSamples.FindAsync(id);
            if (productSample == null)
            {
                return NotFound();
            }

            _context.ProductSamples.Remove(productSample);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductSampleExists(string id)
        {
            return _context.ProductSamples.Any(e => e.ProductSampleId == id);
        }
    }
}
