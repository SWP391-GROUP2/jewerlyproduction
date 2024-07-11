using JewelryProduction.DbContext;
using JewelryProduction.Entities;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class InspectionRepository : IInspectionRepository
    {
        private readonly JewelryProductionContext _context;

        public InspectionRepository(JewelryProductionContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Inspection>> GetInspectionsByOrderId(string orderId)
        {
            return await _context.Inspections
                                 .Where(i => i.OrderId == orderId)
                                 .ToListAsync();
        }
        public async Task<Inspection> GetByIdAsync(object id)
        {
            return await _context.Inspections.FindAsync(id);
        }

        public async Task<IEnumerable<Inspection>> GetAllAsync()
        {
            return await _context.Inspections.ToListAsync();
        }

        public async Task AddAsync(Inspection entity)
        {
            await _context.Inspections.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
        public void Update(Inspection entity)
        {
            _context.Inspections.Update(entity);
        }
        public async Task UpdateInspection(Inspection inspection)
        {
            _context.Inspections.Update(inspection);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteInspection(string id)
        {
            var inspection = await _context.Inspections.FindAsync(id);
            if (inspection != null)
            {
                _context.Inspections.Remove(inspection);
                await _context.SaveChangesAsync();
            }
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
