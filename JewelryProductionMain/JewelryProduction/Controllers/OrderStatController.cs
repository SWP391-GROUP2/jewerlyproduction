using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;


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
            var query = _context.Orders
               .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate);
            var orders = await query.ToListAsync();
            var totalOrders = orders.Count;
            var totalRevenue = orders.Sum(o => o.TotalPrice);
            var averageOrderValue = totalRevenue / totalOrders;



            var orderDistribution = new Dictionary<string, Dictionary<string, int>>();
            if (groupBy == "day")
            {
                orderDistribution["day"] = orders
                  .GroupBy(o => o.OrderDate.ToString("yyyy-MM-dd"))
                  .ToDictionary(g => g.Key, g => g.Count());
            }
            else if (groupBy == "week")
            {
                orderDistribution["week"] = orders
                  .GroupBy(o => $"Week {CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(o.OrderDate, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday)}")
                  .ToDictionary(g => g.Key, g => g.Count());
            }
            else if (groupBy == "month")
            {
                orderDistribution["month"] = orders
                  .GroupBy(o => o.OrderDate.ToString("yyyy-MM"))
                  .ToDictionary(g => g.Key, g => g.Count());
            }
            else if (groupBy == "year")
            {
                orderDistribution["year"] = orders
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
                .Where(o => o.OrderId.Contains(searchTerm) || o.CustomizeRequestId.Contains(searchTerm) || o.Status.Contains(searchTerm))
                .ToList();
            return Ok(orders);
        }
        [HttpGet("paging")]
        public async Task<IActionResult> GetAllPaging([FromQuery] OrderPagingRequest request)
        {
            var products = await _orderService.GetAllPaging(request);
            return Ok(products);
        }
        [HttpGet("compare-order-total-price")]
        public async Task<IActionResult> CompareOrderStats(int year)
        {
            // Group orders by year and calculate total price and number of orders for each year
            var ordersByYear = await _context.Orders
                .GroupBy(o => o.OrderDate.Year)
                .Select(g => new
                {
                    Year = g.Key,
                    TotalPrice = g.Sum(o => o.TotalPrice),
                    NumberOfOrders = g.Count()
                })
                .ToListAsync();

            // Get the total price and number of orders for the specific year
            var currentYearStats = ordersByYear.FirstOrDefault(o => o.Year == year);

            var currentYearTotalPrice = currentYearStats?.TotalPrice ?? 0;
            var currentYearOrderCount = currentYearStats?.NumberOfOrders ?? 0;

            // Prepare the result comparing the specific year to all other years
            var comparisons = ordersByYear
                .Where(o => o.Year != year)
                .Select(o => new
                {
                    Year = o.Year,
                    TotalPrice = o.TotalPrice,
                    NumberOfOrders = o.NumberOfOrders,
                    TotalPriceDifference = currentYearTotalPrice - o.TotalPrice,
                    OrderCountDifference = currentYearOrderCount - o.NumberOfOrders
                })
                .ToList();

            var result = new
            {
                CurrentYear = year,
                CurrentYearTotalPrice = currentYearTotalPrice,
                CurrentYearOrderCount = currentYearOrderCount,
                Comparisons = comparisons
            };

            return Ok(result);
        }
    }
}
