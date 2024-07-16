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
        private readonly IOrderService _orderService;

        public OrderStatController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet]
        public async Task<IActionResult> GetOrderStats(
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate,
            [FromQuery] string groupBy)
        {
            var orderStats = await _orderService.GetOrderStats(startDate, endDate, groupBy);
            return Ok(orderStats);
        }
        [HttpGet("byYear")]
        public async Task<ActionResult<List<Order>>> GetOrdersByYearSortedByPrice([FromQuery] int year)
        {
            var orders = await _orderService.GetOrdersByYearSortedByPrice(year);
            return Ok(orders);
        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchOrders(string searchTerm)
        {
            var orders = await _orderService.SearchOrders(searchTerm);
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
            var orderComparison = await _orderService.CompareOrderStats(year);
            return Ok(orderComparison);
        }
        [HttpGet("CalculateGoldWeightUsedInMonth")]
        public async Task<IActionResult> CalculateGoldWeightUsedInMonth([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            if (startDate > endDate)
            {
                return BadRequest("Start date cannot be later than end date.");
            }

            var totalGoldWeight = await _orderService.CalculateGoldWeightByTypeInMonth(startDate, endDate);
            return Ok(totalGoldWeight);
        }
        [HttpGet("CalculateGemstoneWeightUsedInMonth")]
        public async Task<IActionResult> CalculateGemstoneWeightInMonth([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            if (startDate > endDate)
            {
                return BadRequest("Start date cannot be later than end date.");
            }

            var GemWeight = await _orderService.CalculateGemstoneWeightInMonth(startDate, endDate);
            return Ok(GemWeight);
        }
    }
}
