using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.DTO.BasicDTO;
using JewelryProduction.Interface;
using JewelryProduction.Repositories;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<decimal> CalculateProductCost(string CustomizeRequestId)
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
            decimal goldPrice = gold.PricePerGram * (decimal)customerRequest.GoldWeight;
            decimal gemstonePrice = gemstones.Sum(x => x.Price);
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

        public async Task<List<UserWithCountDTO>> GetStaffs()
        {
            return await _repository.GetStaffs();
        }
    }
}
