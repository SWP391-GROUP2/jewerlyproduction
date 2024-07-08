using JewelryProduction.Common;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using JewelryProduction.Repositories;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Services
{
    public class OrderService : IOrderService
    {
        private readonly JewelryProductionContext _context;
        private readonly IOrderRepository _repository;

        public OrderService(JewelryProductionContext context, IOrderRepository repository)
        {
            _context = context;
            _repository = repository;
        }

        public async Task<List<Order>> GetOrdersByYearSortedByPrice(int year)
        {
            IQueryable<Order> query = _context.Orders
                .Where(o => o.OrderDate.Year == year)
                .OrderBy(o => o.TotalPrice);

            return await query.ToListAsync();
        }
        public async Task<List<GemstoneWeightDto>> CalculateGemstoneWeightInMonth(DateTime startDate, DateTime endDate)
        {
            return await _repository.CalculateGemstoneWeightInMonthAsync(startDate, endDate);
        }
        public async Task<Dictionary<string, double>> CalculateGoldWeightByTypeInMonth(DateTime startDate, DateTime endDate)
        {
            return await _repository.CalculateGoldWeightByTypeInMonthAsync(startDate, endDate);
        }
        public async Task<PagedResult<Order>> GetAllPaging(OrderPagingRequest request)
        {

            IQueryable<Order> query = _context.Orders;
            if (!string.IsNullOrEmpty(request.Keyword))
                query = query.Where(o => o.OrderId.Contains(request.Keyword) || o.CustomizeRequestId.Contains(request.Keyword) || o.Status.Contains(request.Keyword));
            var totalOrders = await query.CountAsync();
            var orders = await query
                .Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(o => new Order()
                {
                    OrderId = o.OrderId,
                    OrderDate = o.OrderDate,
                    TotalPrice = o.TotalPrice
                })
                .ToListAsync();

            var pagedResult = new PagedResult<Order>
            {
                TotalRecords = totalOrders,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
                Items = orders
            };

            return pagedResult;

        }

        public async Task<List<OrderGetDTO>> GetOrders()
        {
            return await _repository.GetOrders();
        }

        public async Task<OrderGetDTO> GetOrder(string id)
        {
            return await _repository.GetOrder(id);
        }
    }

}
