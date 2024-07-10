using JewelryProduction.DbContext;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class CollectionRepository : ICollectionRepository
    {
        private readonly JewelryProductionContext _context;
        public CollectionRepository(JewelryProductionContext context)
        {
            _context = context;
        }

        public async Task<Collection> GetCollectionByIdAsync(string collectionId)
        {
            return await _context.Collections
                .Include(c => c.ProductSamples)
                .FirstOrDefaultAsync(c => c.CollectionId == collectionId);
        }

        public async Task<List<ProductSample>> GetProductSamplesByStyleAsync(string style)
        {
            return await _context.ProductSamples
                .Where(ps => ps.Style == style)
                .ToListAsync();
        }

        public async Task AddProductSamplesToCollectionAsync(string collectionId, List<ProductSample> productSamples)
        {
            if (productSamples == null || !productSamples.Any())
            {
                throw new ArgumentException("Product samples cannot be null or empty");
            }

            var collection = await GetCollectionByIdAsync(collectionId);
            if (collection == null) throw new ArgumentException("Collection not found");

            foreach (var productSample in productSamples)
            {
                collection.ProductSamples.Add(productSample);
            }

            await _context.SaveChangesAsync();
        }
        public async Task<Collection> GetByIdAsync(object id)
        {
            return await _context.Collections.FindAsync(id);
        }

        public async Task<IEnumerable<Collection>> GetAllAsync()
        {
            return await _context.Collections.ToListAsync();
        }

        public async Task AddAsync(Collection entity)
        {
            await _context.Collections.AddAsync(entity);
        }

        public void Update(Collection entity)
        {
            _context.Collections.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
