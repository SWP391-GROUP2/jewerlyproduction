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
        private readonly IEmailService _emailService;
        private readonly ICustomerRequestRepository _customerRequestRepository;
        private readonly IGoldRepository _goldRepository;
        private readonly IGemstoneRepository _gemstoneRepository;

        public SaleStaffService(JewelryProductionContext context, ISaleStaffRepository repository, IEmailService emailService, ICustomerRequestRepository customerRequestRepository, IGoldRepository goldRepository, IGemstoneRepository gemstoneRepository)
        {
            _context = context;
            _repository = repository;
            _emailService = emailService;
            _customerRequestRepository = customerRequestRepository;
            _goldRepository = goldRepository;
            _gemstoneRepository = gemstoneRepository;
        }
        public async Task<bool> SendForApprovalAsync(string customizeRequestId, double goldWeight, string senderId)
        {
            var customerRequest = await _customerRequestRepository.GetByIdAsync(customizeRequestId);
            if (customerRequest == null)
            {
                throw new ArgumentNullException(nameof(customerRequest), "Customer request not found.");
            }
            var gold = await _goldRepository.GetByIdAsync(customerRequest.GoldId);
            var gemstones = await _gemstoneRepository.GetByCustomizeRequestIdAsync(customizeRequestId);
            if (customerRequest.GoldWeight == null)
            {
                customerRequest.GoldWeight = goldWeight;
            }

            var price = await CalculateProductCost(customizeRequestId);

            customerRequest.quotationDes = @$"
Gemstone Price:             {gemstones.Sum(x => x.Price)}
Gold Price:                 {gold.PricePerGram * (decimal)customerRequest.GoldWeight}
Production Cost:            40% Material Price
Additional Fee:             0
VAT:                        10%";
            customerRequest.quotation = price;
            customerRequest.Status = "Wait For Approval";

            await _customerRequestRepository.SaveChangesAsync();

            // Send email or notification to manager
            await _emailService.SendEmail(customerRequest.ManagerId, "New Request", $"There is a new request with ID: {customizeRequestId} that needs to be approved.");

            return true;
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
                await _emailService.SendEmail(customerRequest.ManagerId, senderId, $"{customerRequest.CustomizeRequestId} quotation has been updated.");
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
