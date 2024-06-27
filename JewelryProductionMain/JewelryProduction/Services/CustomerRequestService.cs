using JewelryProduction.Common;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Services
{
    public class CustomerRequestService : ICustomerRequestService
    {
        private readonly JewelryProductionContext _context;
        private readonly INotificationService _notificationService;

        public CustomerRequestService(JewelryProductionContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }
        public async Task<CustomerRequest> GetCustomerRequestWithQuotationsAsync(string customerRequestId)
        {
            return await _context.CustomerRequests
                .FirstOrDefaultAsync(cr => cr.CustomizeRequestId == customerRequestId && cr.Status == "Wait For Approve");
        }
        public async Task<bool> ApproveCustomerRequest(string customerRequestId)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(customerRequestId);

            if (customerRequest == null)
            {
                return false; 
            }

            customerRequest.Status = "Quotation Approve";

            try
            {
                _context.Update(customerRequest);
                await _context.SaveChangesAsync();

                // Send notification to SaleStaff
                await _notificationService.SendNotificationToUserfAsync(customerRequest.SaleStaffId,customerRequest.ManagerId ,"Your request has been approved.");

                return true;
            }
            catch (DbUpdateException)
            {
                // Handle exception as needed
                return false;
            }
        }
        public async Task<bool> RejectQuotation(string customerRequestId, string message)
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

                // Send notification to SaleStaff
                await _notificationService.SendNotificationToUserfAsync(customerRequest.SaleStaffId,customerRequest.ManagerId, message);

                return true;
            }
            catch (DbUpdateException)
            {
                // Handle exception as needed
                return false;
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
    }
}
