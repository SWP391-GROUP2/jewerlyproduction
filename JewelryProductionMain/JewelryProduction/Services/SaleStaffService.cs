using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Services
{
    public class SaleStaffService : ISaleStaffService
    {
        private readonly JewelryProductionContext _context;

        public SaleStaffService(JewelryProductionContext context)
        {
            _context = context;
        }

        public async Task<decimal> CalculateProductCost(string CustomizeRequestId)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(CustomizeRequestId);
            var gold = await _context.Golds.FindAsync(customerRequest.GoldId);
            var gemstones = await _context.Gemstones
            .Where(g => customerRequest.CustomizeRequestId.Contains(g.CustomizeRequestId))
            .ToListAsync();
            if (customerRequest == null || !customerRequest.Status.Equals("Pending"))
            {
                return 0;
            }
            decimal goldPrice = gold.PricePerGram * (decimal)gold.Weight;
            decimal gemstonePrice = customerRequest.Gemstones.Sum(x => x.Price);
            decimal productCost = ((goldPrice + gemstonePrice) * 1.4M) * 1.1M;
            customerRequest.quotation = productCost;
            await _context.SaveChangesAsync();
            return productCost;
        }
        public decimal GetDeposit(decimal productCost)
        {
            decimal deposit = productCost * 0.3M;
            return deposit;
        }
    }
}
