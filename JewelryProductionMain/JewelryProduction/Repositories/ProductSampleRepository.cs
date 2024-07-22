using Google.Api.Gax.ResourceNames;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class ProductSampleRepository : IProductSampleRepository
    {
        private readonly JewelryProductionContext _context;

        public ProductSampleRepository(JewelryProductionContext context)
        {
            _context = context;
        }

        public async Task<ProductSample> GetProductSampleByIdAsync(string productSampleId)
        {
            return await _context.ProductSamples
                .Include(ps => ps.Gemstones) // Ensure Gemstones are included
                .Include(ps => ps.Gold) // Ensure Gold is included
                .FirstOrDefaultAsync(ps => ps.ProductSampleId == productSampleId);
        }
        
        public async Task<List<Gemstone>> GetGemstonesByNamesAsync(List<string> gemstoneNames)
        {
            return await _context.Gemstones
                .Where(g => gemstoneNames.Contains(g.Name))
                .ToListAsync();
        }
        public async Task<ProductSample> GetByIdAsync(object id)
        {
            return  await _context.ProductSamples.FirstOrDefaultAsync(g => g.ProductSampleId.Equals(id));
        }
        public async Task<List<ProductSample>> GetProductSamplesByListOfIdsAsync(List<string> productSampleIds)
        {
            if (productSampleIds == null || !productSampleIds.Any())
            {
                throw new ArgumentException("Product sample IDs cannot be null or empty");
            }

            return await _context.ProductSamples
                .Where(ps => productSampleIds.Contains(ps.ProductSampleId))
                .ToListAsync();
        }

        public async Task<IEnumerable<ProductSample>> GetAllAsync()
        {
            return await _context.ProductSamples
                .Include(ps => ps.Gemstones)
                .Include(ps => ps._3ddesigns)
                .Include(ps => ps.Gold)
                .ToListAsync();
        }
        public async Task AddAsync(ProductSample entity)
        {
            await _context.ProductSamples.AddAsync(entity);
        }

        public void Update(ProductSample entity)
        {
            _context.ProductSamples.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<ProductSample> AddSampleAsync(AddProductSampleDTO productSample)
        {
            var sampleEntity = new ProductSample()
            {
                ProductSampleId = productSample.ProductSampleId,
                ProductName = productSample.ProductName,
                Description = productSample.Description,
                Type = productSample.Type,
                Style = productSample.Style,
                Size = productSample.Size,
                Price = productSample.Price,
                GoldId = productSample.GoldId,
                GoldWeight = productSample.GoldWeight,
            };
            _context.ProductSamples.Add(sampleEntity);
            await _context.SaveChangesAsync();
            return sampleEntity;
        }

        public async Task<List<GetProductSampleDTO>> GetSamples()
        {
            var samples = await _context.ProductSamples
                .Include(d => d.Gold)
                .Include(d => d._3ddesigns)
                .Include(d => d.Gemstones)
                .ToListAsync();

            var result = samples.Select(samples => new GetProductSampleDTO
            {
                ProductSampleId = samples.ProductSampleId,
                ProductName = samples.ProductName,
                Description = samples.Description,
                Type = samples.Type,
                Style = samples.Style,
                Size = samples.Size,
                Price = samples.Price,
                GoldId = samples.GoldId,
                GoldType = samples.Gold.GoldType,
                GoldWeight = samples.GoldWeight,
                GemstoneId = samples.Gemstones?.Select(g => g.GemstoneId).ToList(),
                _3dDesignId = samples._3ddesigns?.Select(ds => ds._3dDesignId).ToList(),
            }).ToList();

            return result;
        }

        public async Task<GetProductSampleDTO> GetSample(string id)
        {
            var sample = await _context.ProductSamples
                .Where(d => d.ProductSampleId == id)
                .Include(d => d.Gold)
                .Include(d => d._3ddesigns)
                .Include(d => d.Gemstones)
                .FirstOrDefaultAsync();

            if (sample == null)
                throw new Exception($"Gemstone with ID {id} not found.");

            var result = new GetProductSampleDTO
            {
                ProductSampleId = sample.ProductSampleId,
                ProductName = sample.ProductName,
                Description = sample.Description,
                Type = sample.Type,
                Style = sample.Style,
                Size = sample.Size,
                Price = sample.Price,
                GoldId = sample.GoldId,
                GoldType = sample.Gold.GoldType,
                GoldWeight = sample.GoldWeight,
                GemstoneId = sample.Gemstones?.Select(g => g.GemstoneId).ToList(),
                _3dDesignId = sample._3ddesigns?.Select(ds => ds._3dDesignId).ToList(),
            };

            return result;
        }
    }
}
