using JewelryProduction.Common;
using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface IOrderService
    {
        Task<List<Order>> GetOrdersByYearSortedByPrice(int year);
        Task<PagedResult<Order>> GetAllPaging(OrderPagingRequest request);
        Task<Dictionary<string, double>> CalculateGoldWeightByTypeInMonth(DateTime startDate, DateTime endDate);
        Task<List<GemstoneWeightDto>> CalculateGemstoneWeightInMonth(DateTime startDate, DateTime endDate);
        Task<List<OrderGetDTO>> GetOrders();
        Task<OrderGetDTO> GetOrder(string id);
    }
}
