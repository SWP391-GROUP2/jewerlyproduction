using JewelryProduction.DbContext;
using JewelryProduction.Interface;
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

    }
}
