using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Globalization;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly IOrderService _orderService;

        public OrderStatController(JewelryProductionContext context, IOrderService orderService)
        {
            _context = context;
            _orderService = orderService;
        }
        [HttpGet]
        public async Task<IActionResult> GetOrderStats(
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate,
        [FromQuery] string groupBy)
        {
            var query =  _context.Orders
               .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate);
            var orders = await query.ToListAsync();
            var totalOrders = orders.Count;
            var totalRevenue = orders.Sum(o => o.TotalPrice);
            var averageOrderValue = totalRevenue / totalOrders;

            

            var orderDistribution = new Dictionary<string, Dictionary<string, int>>();
            if (groupBy == "day")
            {
                orderDistribution["day"] =  orders
                  .GroupBy(o => o.OrderDate.ToString("yyyy-MM-dd"))
                  .ToDictionary(g => g.Key, g => g.Count());
            }
            else if (groupBy == "week")
            {
                orderDistribution["week"] =  orders
                  .GroupBy(o => $"Week {CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(o.OrderDate, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday)}")
                  .ToDictionary(g => g.Key, g => g.Count());
            }
            else if (groupBy == "month")
            {
                orderDistribution["month"] =  orders
                  .GroupBy(o => o.OrderDate.ToString("yyyy-MM"))
                  .ToDictionary(g => g.Key, g => g.Count());
            }
            else if (groupBy == "year")
            {
                orderDistribution["year"] =  orders
                  .GroupBy(o => o.OrderDate.ToString("yyyy"))
                  .ToDictionary(g => g.Key, g => g.Count());
            }

            return Ok(new
            {
                totalOrders,
                totalRevenue,
                averageOrderValue,
                orderDistribution
            });
        }
        [HttpGet("byYear")]
        public async Task<ActionResult<List<Order>>> GetOrdersByYearSortedByPrice([FromQuery] int year)
        {
            var orders = await _orderService.GetOrdersByYearSortedByPrice(year);
            return Ok(orders);
        }
        [HttpGet("search")]
        public IActionResult SearchOrders(string searchTerm)
        {
            // Query orders based on partial match of OrderId or EmployeeId
            var orders = _context.Orders
                .Where(o => o.OrderId.Contains(searchTerm) || o.SaleStaffId.Contains(searchTerm) || o.CustomerId.Contains(searchTerm) || o.CustomizeRequestId.Contains(searchTerm) || o.Status.Contains(searchTerm))
                .ToList();
            return Ok(orders);
        }
        [HttpGet("paging")]
        public async Task<IActionResult> GetAllPaging([FromQuery] OrderPagingRequest request)
        {
            var products = await _orderService.GetAllPaging(request);
            return Ok(products);
        }
    }
}
