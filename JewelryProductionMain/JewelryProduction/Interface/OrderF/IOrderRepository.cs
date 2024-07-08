using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<List<OrderGetDTO>> GetOrders();
        Task<OrderGetDTO> GetOrder(string id);
    }
}
