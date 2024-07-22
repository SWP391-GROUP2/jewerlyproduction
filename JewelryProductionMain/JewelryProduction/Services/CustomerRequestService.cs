using JewelryProduction.Common;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using JewelryProduction.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace JewelryProduction.Services
{
    public class CustomerRequestService : ICustomerRequestService
    {
        private readonly JewelryProductionContext _context;
        private readonly IEmailService _emailService;
        private readonly ICustomerRequestRepository _customerRequestRepository;
        private readonly IGoldRepository _goldRepository;
        private readonly IGemstoneRepository _gemstoneRepository;
        private readonly IOrderRepository _orderRepository;

        public CustomerRequestService(JewelryProductionContext context, IEmailService emailService, ICustomerRequestRepository customerRequestRepository, IGoldRepository goldRepository, IGemstoneRepository gemstoneRepository, IOrderRepository orderRepository)
        {
            _context = context;
            _emailService = emailService;
            _customerRequestRepository = customerRequestRepository;
            _goldRepository = goldRepository;
            _gemstoneRepository = gemstoneRepository;
            _orderRepository = orderRepository;
        }
        public async Task<CustomerRequest> CreateCustomerRequestAsync(CustomerRequestDTO customerRequestDTO)
        {
            var primaryGemstones = await _gemstoneRepository.GetPrimaryGemstonesAsync(customerRequestDTO.PrimaryGemstoneId);
            var additionalGemstones = await _gemstoneRepository.GetAdditionalGemstonesAsync(customerRequestDTO.AdditionalGemstone);

            var allSelectedGemstones = new List<Gemstone>(primaryGemstones);
            allSelectedGemstones.AddRange(additionalGemstones);

            var gold = await _goldRepository.GetByTypeAsync(customerRequestDTO.GoldType);
            if (gold == null)
            {
                throw new Exception("Gold type not found.");
            }

            var uniqueId = await IdGenerator.GenerateUniqueId<CustomerRequest>(_context, "REQ", 3);

            var customerRequest = new CustomerRequest
            {
                CustomizeRequestId = uniqueId,
                GoldId = gold.GoldId,
                CustomerId = customerRequestDTO.CustomerId,
                Type = customerRequestDTO.Type,
                Style = customerRequestDTO.Style,
                Size = customerRequestDTO.Size,
                Quantity = customerRequestDTO.Quantity,
                Gemstones = allSelectedGemstones,
                Gold = gold,
                Status = "Pending"
            };

            await _customerRequestRepository.AddAsync(customerRequest);
            await _customerRequestRepository.SaveChangesAsync();

            return customerRequest;
        }
        public async Task<CustomerRequest> GetCustomerRequestWithQuotationsAsync(string customerRequestId)
        {
            return await _context.CustomerRequests
                .FirstOrDefaultAsync(cr => cr.CustomizeRequestId == customerRequestId && cr.Status == "Wait For Approve");
        }
        public async Task<bool> ApproveQuotation(string customerRequestId, string managerId)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(customerRequestId);

            if (customerRequest == null)
            {
                return false; 
            }

            customerRequest.Status = "Quotation Approved";

            try
            {
                _context.Update(customerRequest);
                await _context.SaveChangesAsync();

                // Send notification to SaleStaff
                await _emailService.SendEmail(customerRequest.SaleStaffId, "Approve Request", @$"Your request {customerRequestId} has been approved.");
                return true;
            }
            catch (DbUpdateException)
            {
                // Handle exception as needed
                return false;
            }
        }
        public async Task<bool> SendQuotation(string customerRequestId, string staffId)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(customerRequestId);


            if (customerRequest == null|| customerRequest.Status != "Quotation Approved")
            {
                return false; // CustomerRequest not found
            }
            try
            {
                // Calculate deposit amount
                var depositAmount = customerRequest.quotation * 0.3M;

                // Send notification to Customer
                var message = $"Your quotation has been approved. Quotation: {customerRequest.quotation:C}. Description: {customerRequest.quotation}. Please deposit 30% of the quotation amount: {depositAmount:C}.";
                await _emailService.SendEmail(customerRequest.CustomerId,"Quotation Information", message);

                return true;
            }
            catch (DbUpdateException)
            {
                // Handle exception as needed
                return false;
            }
        }
        public async Task<bool> RejectQuotation(string customerRequestId,string managerId, string message)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(customerRequestId);

            if (customerRequest == null)
            {
                return false; // CustomerRequest not found
            }

            customerRequest.Status = "Quotation Rejected";

            try
            {
                _context.Update(customerRequest);
                await _context.SaveChangesAsync();
                await _emailService.SendEmail(customerRequest.SaleStaffId,"Reject Quotation", message);

                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }
        public async Task<bool> UpdateCustomerRequestQuotation(string customerRequestId, decimal newQuotation, string newQuotationDes)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(customerRequestId);

            if (customerRequest == null)
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
                await _emailService.SendEmail(customerRequest.SaleStaffId, "Quotation Updated", $"{customerRequest.CustomizeRequestId} quotation has been updated.");
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }
        public async Task<Order> ApproveCustomerRequestAsync(string customizeRequestId, string paymentMethodId)
        {
            var customerRequest = await _customerRequestRepository.GetCustomerRequestWithDetailsAsync(customizeRequestId);

            if (customerRequest == null)
            {
                throw new KeyNotFoundException("Customer request not found.");
            }

            if (customerRequest.quotation == null)
            {
                throw new InvalidOperationException("Quotation is not available.");
            }

            customerRequest.Status = "Request Approved";

            var order = new Order
            {
                OrderId = await IdGenerator.GenerateUniqueId<Order>(_context, "ORD", 6),
                ProductionStaffId = null,
                DesignStaffId = null,
                OrderDate = DateTime.Now,
                DepositAmount = null,
                Status = "Choosing Payment",
                CustomizeRequestId = customerRequest.CustomizeRequestId,
                PaymentMethodId = paymentMethodId,
                TotalPrice = customerRequest.quotation.Value
            };

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    await _customerRequestRepository.UpdateCustomerRequestAsync(customerRequest);
                    await _orderRepository.AddAsync(order);
                    await _customerRequestRepository.SaveChangesAsync();             
                    await transaction.CommitAsync();
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw; // Re-throw the exception to be handled in the controller
                }
            }

            return order;
        }
        public async Task<bool> RejectCustomerRequestAsync(string customizeRequestId)
        {
            var customerRequest = await _customerRequestRepository.GetCustomerRequestWithDetailsAsync(customizeRequestId);

            if (customerRequest == null)
            {
                return false;
            }

            foreach (var gemstone in customerRequest.Gemstones)
            {
                gemstone.CustomizeRequestId = null;
            }

            customerRequest.Status = "Request Reject";

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return true;
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
            public async Task<PagedResult<CustomerRequest>> GetAllPaging(OrderPagingRequest request)
        {

            IQueryable<CustomerRequest> query = _context.CustomerRequests;
            if (!string.IsNullOrEmpty(request.Keyword))
                query = query.Where(o => o.CustomizeRequestId.Contains(request.Keyword) || o.Type.Contains(request.Keyword) || o.Style.Contains(request.Keyword) || o.CustomerId.Contains(request.Keyword) || o.Status.Contains(request.Keyword));

            var totalRequests = await query.CountAsync();
            var customerRequests = await query
                .Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(o => new CustomerRequest()
                {
                    CustomizeRequestId = o.CustomizeRequestId,
                    GoldId = o.GoldId,
                    CustomerId = o.CustomerId,
                    Type = o.Type,
                    Style = o.Style,
                    Size = o.Size,
                    Quantity = o.Quantity,
                    Gemstones = o.Gemstones,
                    Gold = o.Gold,
                    Status = o.Status
                })
                .ToListAsync();

            var pagedResult = new PagedResult<CustomerRequest>
            {
                TotalRecords = totalRequests,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
                Items = customerRequests
            };

            return pagedResult;

        }

        public async Task<List<CustomerRequestGetDTO>> GetCustomerRequests()
        {
            return await _customerRequestRepository.GetCustomerRequests();
        }

        public async Task<CustomerRequestGetDTO> GetCustomerRequest(string id)
        {
            return await _customerRequestRepository.GetCustomerRequest(id);
        }

        public async Task<bool> CloseRequest(string customerRequestId) => await _customerRequestRepository.CloseRequest(customerRequestId);
    }
}
