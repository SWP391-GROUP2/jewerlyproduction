using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<List<OrderGetDTO>> GetOrders();
        Task<OrderGetDTO> GetOrder(string id);
        Order GetOrderOnly(string id);
        Task<Dictionary<string, double>> CalculateGoldWeightByTypeInMonthAsync(DateTime startDate, DateTime endDate);
        Task<List<GemstoneWeightDto>> CalculateGemstoneWeightInMonthAsync(DateTime startDate, DateTime endDate);
    }
}

