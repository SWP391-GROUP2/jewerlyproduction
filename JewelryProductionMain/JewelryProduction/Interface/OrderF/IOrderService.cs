using JewelryProduction.Common;
using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;

namespace JewelryProduction.Interface
{
    public interface IOrderService
    {
        string GetCustomerIdByOrderId(string orderId);
        string GetManagerIdByOrderId(string orderId);
        Task<OrderStatDTO> GetOrderStats(DateTime? startDate, DateTime? endDate, string groupBy);
        Task<OrderComparisonDTO> CompareOrderStats(int year);
        Task<List<Order>> SearchOrders(string searchTerm);
        Task<IActionResult> RecordInspection(string orderId, string stage, InspectionDTO inspectionDto);
        Task<IActionResult> UpdateFinalInspection(string orderId, string stage);
        Task<List<Order>> GetOrdersByYearSortedByPrice(int year);
        Task<PagedResult<Order>> GetAllPaging(OrderPagingRequest request);
        Task<Dictionary<string, double>> CalculateGoldWeightByTypeInMonth(DateTime startDate, DateTime endDate);
        Task<List<GemstoneWeightDto>> CalculateGemstoneWeightInMonth(DateTime startDate, DateTime endDate);
        Task<List<GetAllOrdersDTO>> GetOrders();
        Task<OrderGetDTO> GetOrder(string id);
        Task<bool> ToPaymentPendingStatus(string orderId);
    }
}
