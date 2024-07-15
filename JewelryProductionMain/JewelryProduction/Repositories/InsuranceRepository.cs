using JewelryProduction.DbContext;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class InsuranceRepository : IInsuranceRepository
    {
        private readonly JewelryProductionContext _context;

        public InsuranceRepository(JewelryProductionContext context)
        {
            _context = context;
        }
        public async Task<Insurance> GetByIdAsync(object id)
        {
            return await _context.Insurances.FindAsync(id);
        }

        public async Task<IEnumerable<Insurance>> GetAllAsync()
        {
            return await _context.Insurances.ToListAsync();
        }

        public async Task AddAsync(Insurance entity)
        {
            await _context.Insurances.AddAsync(entity);
        }

        public void Update(Insurance entity)
        {
            _context.Insurances.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
