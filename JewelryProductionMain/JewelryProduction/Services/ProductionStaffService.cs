using JewelryProduction.DbContext;
using JewelryProduction.DTO.BasicDTO;
using JewelryProduction.Interface;
using JewelryProduction.Repositories;
using NuGet.Protocol.Core.Types;

namespace JewelryProduction.Services
{
    public class ProductionStaffService : IProductionStaffService
    {
        private readonly IProductionStaffRepository _repository;

        public ProductionStaffService(IProductionStaffRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<StaffWithCountDTO>> GetStaffs()
        {
            return await _repository.GetStaffs();
        }
    }
}
