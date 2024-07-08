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
        private readonly INotificationService _notificationService;

        public SaleStaffService(JewelryProductionContext context, ISaleStaffRepository repository, INotificationService notificationService)
        {
            _context = context;
            _repository = repository;
            _notificationService = notificationService;
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
            decimal productCost = ((goldPrice + gemstonePrice) * customerRequest.Quantity * 1.4M) * 1.1M;
            customerRequest.quotation = productCost;
            await _context.SaveChangesAsync();
            return productCost;
        }
        public async Task<bool> UpdateCustomerRequestQuotation(string customerRequestId, decimal newQuotation, string newQuotationDes, string senderId)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(customerRequestId);

            if (customerRequest == null || customerRequest.Status != "Quotation Rejected")
            {
                return false;
            }

            customerRequest.quotation = newQuotation;
            customerRequest.quotationDes = newQuotationDes;
            customerRequest.Status = "Wait for Approved";

            try
            {
                _context.Update(customerRequest);
                await _context.SaveChangesAsync();
                await _notificationService.SendNotificationToUserfAsync(customerRequest.ManagerId, senderId, $"{customerRequest.CustomizeRequestId} quotation has been updated.");
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }
        public decimal GetDeposit(decimal productCost)
        {
            decimal deposit = productCost * 0.3M;
            return deposit;
        }

        public async Task<List<SaleStaffWithCountDTO>> GetStaffs()
        {
            return await _repository.GetStaffs();
        }
    }
}
