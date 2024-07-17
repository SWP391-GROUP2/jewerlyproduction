using JewelryProduction.Entities;

namespace JewelryProduction.Interface
{
    public interface IInspectionRepository : IRepository<Inspection>
    {
        Task<IEnumerable<Inspection>> GetInspectionsByOrderId(string orderId);
        Task UpdateInspection(Inspection inspection);
        Task DeleteInspection(string id);
    }
}
