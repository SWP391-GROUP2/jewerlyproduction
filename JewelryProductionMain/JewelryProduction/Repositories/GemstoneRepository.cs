using JewelryProduction.DbContext;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class GemstoneRepository : IGemstoneRepository
    {
        private readonly JewelryProductionContext _context;

        public GemstoneRepository(JewelryProductionContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Gemstone>> GetByCustomizeRequestIdAsync(string customizeRequestId)
        {
            return await _context.Gemstones
                                 .Where(g => g.CustomizeRequestId == customizeRequestId)
                                 .ToListAsync();
        }

        public async Task<Gemstone> GetByIdAsync(object id)
        {
            return await _context.Gemstones.FindAsync(id);
        }

        public async Task<IEnumerable<Gemstone>> GetAllAsync()
        {
            return await _context.Gemstones.ToListAsync();
        }

        public async Task AddAsync(Gemstone entity)
        {
            await _context.Gemstones.AddAsync(entity);
        }

        public void Update(Gemstone entity)
        {
            _context.Gemstones.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<List<Gemstone>> GetPrimaryGemstonesAsync(IEnumerable<string> gemstoneIds)
        {
            return await _context.Gemstones
                .Where(g =>
                    gemstoneIds.Contains(g.GemstoneId) &&
                    g.ProductSample == null && g.CustomizeRequestId == null)
                .GroupBy(g => g.Name)
                .Select(g => g.FirstOrDefault())
                .OrderBy(_ => Guid.NewGuid())
                .Take(2)
                .ToListAsync();
        }

        public async Task<List<Gemstone>> GetAdditionalGemstonesAsync(IEnumerable<string> gemstoneIds)
        {
            return await _context.Gemstones
                .Where(g => gemstoneIds.Contains(g.GemstoneId))
                .GroupBy(g => g.Name)
                .Select(g => g.FirstOrDefault())
                .OrderBy(_ => Guid.NewGuid())
                .Take(2)
                .ToListAsync();
        }

    }
}
