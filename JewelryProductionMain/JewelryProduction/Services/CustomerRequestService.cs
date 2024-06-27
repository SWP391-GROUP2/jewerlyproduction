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

        public CustomerRequestService(JewelryProductionContext context)
        {
            _context = context;
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
