using JewelryProduction.DTO;
using JewelryProduction.Entities;

namespace JewelryProduction.Interface
{
    public interface IOrderRepository : IRepository<Order>
    {
        string GetCustomerIdByOrderId(string orderId);
        string GetManagerIdByOrderId(string orderId);
        Task<List<Order>> GetOrdersWithinDateRange(DateTime? startDate, DateTime? endDate);
        Task<List<Order>> SearchOrders(string searchTerm);
        Task<Order> GetOrderByIdAsync(string orderId);
        Task<Inspection> GetInspectionAsync(string orderId, string stage);
        Task<List<GetAllOrdersDTO>> GetOrders();
        Task<OrderGetDTO> GetOrder(string id);
        Order GetOrderOnly(string id);
        Task<Dictionary<string, double>> CalculateGoldWeightByTypeInMonthAsync(DateTime startDate, DateTime endDate);
        Task<List<GemstoneWeightDto>> CalculateGemstoneWeightInMonthAsync(DateTime startDate, DateTime endDate);
        Task<bool> ToPaymentPendingStatus(string orderId);
    }
}

