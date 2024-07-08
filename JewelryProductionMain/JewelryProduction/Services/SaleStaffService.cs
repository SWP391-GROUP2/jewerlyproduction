using JewelryProduction.DbContext;
using JewelryProduction.DTO.BasicDTO;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Services
{
    public class SaleStaffService : ISaleStaffService
    {
        private readonly JewelryProductionContext _context;
        private readonly ISaleStaffRepository _repository;

        public SaleStaffService(JewelryProductionContext context, ISaleStaffRepository repository)
        {
            _context = context;
            _repository = repository;
        }

        public async Task<double> CalculateProductCost(string CustomizeRequestId)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(CustomizeRequestId);
            var gold = await _context.Golds.FindAsync(customerRequest.GoldId);
            var gemstones = await _context.Gemstones
            .Where(g => g.CustomizeRequestId == CustomizeRequestId)
            .ToListAsync();
            if (customerRequest == null)
            {
                return 0;
            }
            double goldPrice = gold.PricePerGram * (double)customerRequest.GoldWeight;
            double gemstonePrice = gemstones.Sum(x => x.Price);
            double productCost = ((goldPrice + gemstonePrice) * (double)customerRequest.Quantity * 1.4e6) * 1.1e6;
            customerRequest.quotation = productCost;
            await _context.SaveChangesAsync();
            return productCost;
        }
        public double GetDeposit(double productCost)
        {
            double deposit = productCost * 0.3e6;
            return deposit;
        }

        public async Task<List<SaleStaffWithCountDTO>> GetStaffs()
        {
            return await _repository.GetStaffs();
        }
    }
}
