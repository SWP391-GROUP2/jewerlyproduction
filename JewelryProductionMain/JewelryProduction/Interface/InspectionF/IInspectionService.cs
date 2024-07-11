using JewelryProduction.Entities;

namespace JewelryProduction.Interface
{
    public interface IInspectionService
    {
        Task<Inspection> GetInspectionById(string id);
        Task<IEnumerable<Inspection>> GetAllInspections();
        Task<IEnumerable<Inspection>> GetInspectionsByOrderId(string orderId);
        Task AddInspection(Inspection inspection);
        Task UpdateInspection(Inspection inspection);
        Task DeleteInspection(string id);
    }
}
