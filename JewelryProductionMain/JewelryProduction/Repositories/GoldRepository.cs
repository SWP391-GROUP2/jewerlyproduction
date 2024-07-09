using JewelryProduction.DbContext;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class GoldRepository : IGoldRepository
    {
        private readonly JewelryProductionContext _context;

        public GoldRepository(JewelryProductionContext context) => _context = context;

        public async Task<Gold> GetByIdAsync(object goldId)
        {
            // Check if goldId is null and handle appropriately
            if (goldId == null)
            {
                throw new ArgumentNullException(nameof(goldId), "Gold ID cannot be null.");
            }

            // Attempt to retrieve the Gold entity from the context
            var gold = await _context.Golds.FirstOrDefaultAsync(g => g.GoldId.Equals(goldId));

            // Check if the retrieved gold is null
            if (gold == null)
            {
                throw new KeyNotFoundException($"Gold with ID {goldId} was not found.");
            }

            return gold;
        }

        public async Task<IEnumerable<Gold>> GetAllAsync()
        {
            return await _context.Golds.ToListAsync();
        }

        public async Task AddAsync(Gold entity)
        {
            await _context.Golds.AddAsync(entity);
        }

        public void Update(Gold entity)
        {
            _context.Golds.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<Gold> GetByTypeAsync(string goldType)
        {
            return await _context.Golds.FirstOrDefaultAsync(g => g.GoldType == goldType);
        }
    }
}
