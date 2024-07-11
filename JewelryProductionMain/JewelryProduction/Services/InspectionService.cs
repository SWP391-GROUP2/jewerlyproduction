using JewelryProduction.Entities;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Services
{
    public class InspectionService : IInspectionService
    {
        private readonly IInspectionRepository _repository;

        public InspectionService(IInspectionRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Inspection>> GetInspectionsByOrderId(string orderId)
        {
            return await _repository.GetInspectionsByOrderId(orderId);
        }
        public async Task<Inspection> GetInspectionById(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Inspection>> GetAllInspections()
        {
            return await _repository.GetAllAsync();
        }

        public async Task AddInspection(Inspection inspection)
        {
            await _repository.AddAsync(inspection);
        }

        public async Task UpdateInspection(Inspection inspection)
        {
            await _repository.UpdateInspection(inspection);
            
        }

        public async Task DeleteInspection(string id)
        {
            await _repository.DeleteInspection(id);
        }
    }
}
