using JewelryProduction.Common;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSamplesController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly IProductSampleService _productSampleService;

        public ProductSamplesController(JewelryProductionContext context, IProductSampleService productSampleService)
        {
            _context = context;
            _productSampleService = productSampleService;
        }

        // GET: api/ProductSamples
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductSampleDTO>>> GetProductSamplesWithGoldType()
        {
            var result = await _context.ProductSamples
                .Include(ps => ps.Gold)
                .Select(ps => new ProductSampleDTO
                {
                    ProductSampleId = ps.ProductSampleId,
                    ProductName = ps.ProductName,
                    Description = ps.Description,
                    Type = ps.Type,
                    Style = ps.Style,
                    Size = ps.Size,
                    Price = ps.Price,
                    GoldType = _context.Golds.Where(g => g.GoldId.Equals(ps.GoldId)).Select(g => g.GoldType).FirstOrDefault(),
                    Image = _context._3ddesigns.Where(i => i.ProductSampleId.Equals(ps.ProductSampleId)).Select(i => i.Image).FirstOrDefault()
                })
                .ToListAsync();

            return Ok(result);
        }

        // GET: api/ProductSamples/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductSample>> GetProductSample(string id)
        {
            //var productSample = await _context.ProductSamples.FindAsync(id);

            //if (productSample == null)
            //{
            //    return NotFound();
            //}

            var result = _context.ProductSamples
                .Include(ps => ps.Gold)
                .Where(ps => ps.ProductSampleId == id)
                .Select(ps => new ProductDetailDTO
                {
                    ProductSampleId = ps.ProductSampleId,
                    ProductName = ps.ProductName,
                    Description = ps.Description,
                    Type = ps.Type,
                    Style = ps.Style,
                    Size = ps.Size,
                    Price = ps.Price,
                    GoldType = _context.Golds.Where(g => g.GoldId.Equals(ps.GoldId)).Select(g => g.GoldType).FirstOrDefault(),
                    Image = _context._3ddesigns.Where(i => i.ProductSampleId.Equals(ps.ProductSampleId)).Select(i => i.Image).ToList()
               
                })
                .First();

            var gemstone = await _context.Gemstones.Where(g => g.ProductSampleId.Equals(id)).ToListAsync();

            var result2 = new ProductDetailsWithGemstone()
            {
                productSample = result,
                gemstones = gemstone
            };
            return Ok(result2);
        }

        // GET: api/ProductSamples/5
        [HttpGet("FilterInSearch")]
        public async Task<ActionResult<IEnumerable<ProductSample>>> GetFilter(string? type, string? style, string? sortPrice) // Filter in search
        {

            //check whether type or style is null
            var productSamples = _context.ProductSamples
                .Include(ps => ps.Gold)
                .Select(ps => new ProductSampleDTO
                {
                    ProductSampleId = ps.ProductSampleId,
                    ProductName = ps.ProductName,
                    Description = ps.Description,
                    Type = ps.Type,
                    Style = ps.Style,
                    Size = ps.Size,
                    Price = ps.Price,
                    GoldType = _context.Golds.Where(g => g.GoldId.Equals(ps.GoldId)).Select(g => g.GoldType).FirstOrDefault(),
                    Image = _context._3ddesigns.Where(i => i.ProductSampleId.Equals(ps.ProductSampleId)).Select(i => i.Image).FirstOrDefault()
                })
                .AsQueryable();

            if (type is null && style is not null)
                productSamples = productSamples.Where(p => p.Style == style);
            else if (style is null && type is not null)
                productSamples = productSamples.Where(p => p.Type == type);
            else if (style is not null && style is not null)
            {
                productSamples = productSamples.Where(p => p.Type == type && p.Style == style);
            }
            if (sortPrice is null) sortPrice = "asc";
            productSamples = sortPrice.ToLower() == "asc" ? productSamples.OrderBy(p => p.Price) : productSamples.OrderByDescending(p => p.Price);

            var result = await productSamples.ToListAsync();
            return Ok(result);
        }

        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<ProductSample>>> Search(string name)
        {
            List<ProductSample> _products = await _context.ProductSamples.ToListAsync();
            var products = _products.Where(p => p.ProductName.Contains(name, System.StringComparison.OrdinalIgnoreCase));
            if (products.Any())
            {
                return Ok(products);
            }
            return NotFound();
        }
        [HttpGet("CollectionSample")]
        public async Task<IActionResult> GetProductSamples(string collectionId)
        {
            var productSamples = await _productSampleService.GetProductSamplesByCollectionIdAsync(collectionId);
            return Ok(productSamples); 
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
            updateProduct.Description = productSampleDTO.Description;
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
            var uniqueId = await IdGenerator.GenerateUniqueId<CustomerRequest>(_context, "PS", 3);

            var productSample = new ProductSample
            {
                ProductSampleId = uniqueId,
                ProductName = productSampleDTO.ProductName,
                Description = productSampleDTO.Description,
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
        [HttpPost("getrecommend")]
        public async Task<IActionResult> GetRecommendations([FromQuery] string? type, [FromQuery] string? style, [FromQuery] double? size, [FromQuery] string? goldType, [FromQuery] List<string>? gemstoneName)
        {
            var recommendations = await _productSampleService.GetRecommendedSamples(type, style, size, goldType, gemstoneName);
            return Ok(recommendations);
        }

        private bool ProductSampleExists(string id)
        {
            return _context.ProductSamples.Any(e => e.ProductSampleId == id);
        }
    }

    public class ProductSamplesWithGemstone()
    {
        public ProductSampleDTO productSample { get; set; }
        public List<Gemstone> gemstones { get; set; }
    }

    public class ProductDetailsWithGemstone()
    {
        public ProductDetailDTO productSample { get; set; }
        public List<Gemstone> gemstones { get; set; }
    }
}
