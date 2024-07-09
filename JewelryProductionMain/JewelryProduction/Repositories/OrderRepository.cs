using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly JewelryProductionContext _context;
        public OrderRepository(JewelryProductionContext context)
        {
            _context = context;
        }

        public async Task<List<OrderGetDTO>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.CustomizeRequest.Customer)
                .Include(o => o.CustomizeRequest.Manager)
                .Include(o => o.CustomizeRequest.SaleStaff)
                .Include(o => o.ProductionStaff)
                .Include(o => o.DesignStaff)
                .Include(o => o.PaymentMethod)
                .ToListAsync();

            var result = orders.Select(o => new OrderGetDTO
            {
                Order = o,
                PaymentMethodName = o.PaymentMethod?.PaymentMethodName
            }).ToList();

            return result;
        }

        public async Task<OrderGetDTO> GetOrder(string id)
        {
            var order = await _context.Orders
                .Include(o => o.CustomizeRequest)
                .Include(o => o.ProductionStaff)
                .Include(o => o.DesignStaff)
                .Include(o => o.PaymentMethod)
                .Where(o => o.OrderId.Equals(id))
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return null; // Hoặc xử lý theo cách khác phù hợp với logic của bạn
            }

            var result = new OrderGetDTO
            {
                Order = order,
                PaymentMethodName = order.PaymentMethod?.PaymentMethodName
            };

            return result;
        }

        public Order GetOrderOnly(string id)
        {
            var order = _context.Orders
                .Include(o => o.CustomizeRequest)
                .Include(o => o.ProductionStaff)
                .Include(o => o.DesignStaff)
                .Include(o => o.PaymentMethod)
                .Where(o => o.OrderId.Equals(id))
                .FirstOrDefault();

            return order;
        }
    }
}
