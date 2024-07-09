using JewelryProduction.Common;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Entities;
using JewelryProduction.Interface;
using JewelryProduction.Repositories;
using Microsoft.AspNetCore.Mvc;
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
    }

}
