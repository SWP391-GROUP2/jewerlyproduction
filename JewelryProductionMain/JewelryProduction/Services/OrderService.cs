using JewelryProduction.Common;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Entities;
using JewelryProduction.Interface;
using JewelryProduction.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

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
        public async Task<IActionResult> RecordInspection(string orderId, string stage, InspectionDTO inspectionDto)
        {
            var order = await _repository.GetOrderByIdAsync(orderId);
            if (order == null)
            {
                return new NotFoundObjectResult("Order not found");
            }

            var inspection = await _repository.GetInspectionAsync(orderId, stage);
            if (inspection == null)
            {
                inspection = new Inspection { OrderId = orderId, Stage = stage };
                _context.Inspections.Add(inspection);
            }

            inspection.Result = inspectionDto.Result;
            inspection.Comment = inspectionDto.Comment;

            if (inspection.Result == false)
            {
                return new OkObjectResult("Inspection recorded and sent to the manager.");
            }

            if (stage == "Final Inspection" && inspection.Result == true)
            {
                order.Status = "Completed";
            }

            await _repository.SaveChangesAsync();

            return new OkObjectResult("Inspection recorded successfully");
        }
        public async Task<OrderStatDTO> GetOrderStats(DateTime? startDate, DateTime? endDate, string groupBy)
        {
            var orders = await _repository.GetOrdersWithinDateRange(startDate, endDate);
            var totalOrders = orders.Count;
            var totalRevenue = orders.Sum(o => o.TotalPrice + (o.DepositAmount ?? 0));
            var totalMaterialPrice = orders.Sum(o =>
            {
                var gemstonesPrice = o.CustomizeRequest.Gemstones.Sum(g => g.Price);
                var goldPrice = o.CustomizeRequest.Gold.PricePerGram * (decimal)(o.CustomizeRequest.GoldWeight ?? 0);
                return gemstonesPrice + goldPrice;
            });
            var totalIncome = totalRevenue - totalMaterialPrice;
            var averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

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

            return new OrderStatDTO
            {
                TotalOrders = totalOrders,
                TotalRevenue = totalRevenue,
                TotalMaterialPrice = totalMaterialPrice,
                TotalIncome = totalIncome,
                AverageOrderValue = averageOrderValue,
                OrderDistribution = orderDistribution
            };
        }
        public async Task<OrderComparisonDTO> CompareOrderStats(int year)
        {
            var orders = await _repository.GetAllAsync();
            var ordersByYear = orders
                .GroupBy(o => o.OrderDate.Year)
                .Select(g => new
                {
                    Year = g.Key,
                    TotalPrice = g.Sum(o => o.TotalPrice),
                    NumberOfOrders = g.Count()
                })
                .ToList();

            var currentYearStats = ordersByYear.FirstOrDefault(o => o.Year == year);

            var currentYearTotalPrice = currentYearStats?.TotalPrice ?? 0;
            var currentYearOrderCount = currentYearStats?.NumberOfOrders ?? 0;

            var comparisons = ordersByYear
                .Where(o => o.Year != year)
                .Select(o => new OrderYearComparisonDTO
                {
                    Year = o.Year,
                    TotalPrice = o.TotalPrice,
                    NumberOfOrders = o.NumberOfOrders,
                    TotalPriceDifference = currentYearTotalPrice - o.TotalPrice,
                    OrderCountDifference = currentYearOrderCount - o.NumberOfOrders
                })
                .ToList();

            return new OrderComparisonDTO
            {
                CurrentYear = year,
                CurrentYearTotalPrice = currentYearTotalPrice,
                CurrentYearOrderCount = currentYearOrderCount,
                Comparisons = comparisons
            };
        }
        public async Task<List<Order>> SearchOrders(string searchTerm)
        {
            return await _repository.SearchOrders(searchTerm);
        }
        public string GetManagerIdByOrderId(string orderId)
        {
            return _repository.GetManagerIdByOrderId(orderId);
        }
        public async Task<List<OrderGetDTO>> GetOrders()
        {
            return await _repository.GetOrders();
        }

        public async Task<OrderGetDTO> GetOrder(string id)
        {
            return await _repository.GetOrder(id);
        }

        public async Task<bool> ToPaymentPendingStatus(string orderId)
        {
            bool check = await _repository.ToPaymentPendingStatus(orderId);
            return check;
        }
    }

}
