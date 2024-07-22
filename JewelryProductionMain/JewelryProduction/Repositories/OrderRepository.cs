using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Entities;
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
        public async Task<Order> GetOrderByIdAsync(string orderId)
        {
            return await _context.Orders
                .Include(o => o.ProductionStaff)
                .Include(o => o.CustomizeRequest)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);
        }

        public async Task<Inspection> GetInspectionAsync(string orderId, string stage)
        {
            return await _context.Inspections
                .FirstOrDefaultAsync(i => i.OrderId == orderId && i.Stage == stage);
        }

        public async Task<List<GetAllOrdersDTO>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.CustomizeRequest)
                .ThenInclude(cr => cr.Customer)
                .Include(o => o.CustomizeRequest.Manager)
                .Include(o => o.CustomizeRequest.SaleStaff)
                .Include(o => o.CustomizeRequest.Gold)
                .Include(o => o.ProductionStaff)
                .Include(o => o.DesignStaff)
                .Include(o => o.PaymentMethod)
                .ToListAsync();

            var result = orders.Select(o => new GetAllOrdersDTO
            {
                OrderId = o.OrderId,
                OrderDate = o.OrderDate,
                CustomerId = o.CustomizeRequest.Customer.Id,
                CustomerName = o.CustomizeRequest.Customer.Name,
                ManagerId = o.CustomizeRequest.Manager.Id,
                ManagerName = o.CustomizeRequest.Manager.Name,
                SaleStaffId = o.CustomizeRequest.SaleStaff.Id,
                SaleStaffName = o.CustomizeRequest.SaleStaff.Name,
                CustomizeRequestId = o.CustomizeRequestId ?? null,
                PaymentMethodId = o.PaymentMethodId,
                GoldType = o.CustomizeRequest.Gold.GoldType,
                GoldWeight = o.CustomizeRequest.GoldWeight ?? 0,
                ProductionStaffName = o.ProductionStaff?.Name ?? null,
                DesignStaffName = o.DesignStaff?.Name ?? null,
                DesignStaffId = o.DesignStaff?.Id ?? null,
                ProductionStaffId = o.ProductionStaffId ?? null,
                PaymentMethodName = o.PaymentMethod.PaymentMethodName,
                Address = o.Address,
                Status = o.Status,
                quotation = o.CustomizeRequest.quotation ?? 0,
                quotationDes = o.CustomizeRequest.quotationDes,
                Deposit = o.DepositAmount,
                TotalPrice = o.TotalPrice
            }).ToList();

            return result;
        }
        public string GetManagerIdByOrderId(string orderId)
        {
            var managerId = _context.Orders
                .Where(o => o.OrderId == orderId)
                .Select(o => o.CustomizeRequest.ManagerId)
                .FirstOrDefault();

            return managerId;
        }
        public string GetCustomerIdByOrderId(string orderId)
        {
            var customerId = _context.Orders
                .Where(o => o.OrderId == orderId)
                .Select(o => o.CustomizeRequest.CustomerId)
                .FirstOrDefault();

            return customerId;
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
        public async Task<Order> GetByIdAsync(object id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _context.Orders.ToListAsync();
        }
        public async Task<List<Order>> GetOrdersWithinDateRange(DateTime? startDate, DateTime? endDate)
        {
            return await _context.Orders
                .Include(o => o.CustomizeRequest)
                .ThenInclude(cr => cr.Gemstones)
                .Include(o => o.CustomizeRequest.Gold)
                .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
                .ToListAsync();
        }
        public async Task<List<Order>> SearchOrders(string searchTerm)
        {
            return await _context.Orders
                .Where(o => o.OrderId.Contains(searchTerm) || o.CustomizeRequestId.Contains(searchTerm) || o.Status.Contains(searchTerm))
                .ToListAsync();
        }

        public async Task AddAsync(Order entity)
        {
            await _context.Orders.AddAsync(entity);
        }

        public void Update(Order entity)
        {
            _context.Orders.Update(entity);
        }
        public async Task<Dictionary<string, double>> CalculateGoldWeightByTypeInMonthAsync(DateTime startDate, DateTime endDate)
        {
            var totalGoldWeights = await (from cr in _context.CustomerRequests
                                          join o in _context.Orders on cr.CustomizeRequestId equals o.CustomizeRequestId
                                          join g in _context.Golds on cr.GoldId equals g.GoldId
                                          where o.OrderDate >= startDate && o.OrderDate <= endDate
                                          group cr by g.GoldType into grouped
                                          select new
                                          {
                                              GoldType = grouped.Key,
                                              TotalGoldWeight = grouped.Sum(cr => cr.GoldWeight) ?? 0
                                          }).ToDictionaryAsync(g => g.GoldType, g => g.TotalGoldWeight);

            return totalGoldWeights;
        }
        public async Task<List<GemstoneWeightDto>> CalculateGemstoneWeightInMonthAsync(DateTime startDate, DateTime endDate)
        {
            var gemstoneWeights = await (from cr in _context.CustomerRequests
                                         join o in _context.Orders on cr.CustomizeRequestId equals o.CustomizeRequestId
                                         join g in _context.Gemstones on cr.CustomizeRequestId equals g.CustomizeRequestId
                                         where o.OrderDate >= startDate && o.OrderDate <= endDate
                                         group g by new { g.Name, g.Clarity, g.Color, g.Shape, g.Size, g.CaratWeight } into grouped
                                         select new GemstoneWeightDto
                                         {
                                             Name = grouped.Key.Name,
                                             Clarity = grouped.Key.Clarity,
                                             Color = grouped.Key.Color,
                                             Shape = grouped.Key.Shape,
                                             Size = grouped.Key.Size,
                                             CaratWeight = grouped.Key.CaratWeight,
                                             TotalCaratWeight = grouped.Sum(g => g.CaratWeight),
                                             GemstoneCount = grouped.Count()
                                         }).ToListAsync();

            return gemstoneWeights;
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ToPaymentPendingStatus(string orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) return false;

            order.Status = "Payment Pending";
            await _context.SaveChangesAsync(); // Save changes to the database
            return true;
        }
    }
}
