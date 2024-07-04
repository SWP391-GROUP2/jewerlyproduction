using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface IOrderRepository
    {
        Task<List<OrderGetDTO>> GetOrders();
        Task<OrderGetDTO> GetOrder(string id);
    }
}
