using JewelryProduction.DbContext;
using JewelryProduction.DTO.BasicDTO;
using JewelryProduction.Interface;
using NuGet.Protocol.Core.Types;

namespace JewelryProduction.Services
{
    public class DesignStaffService : IDesignStaffService
    {
        private readonly IDesignStaffRepository _repository;

        public DesignStaffService(IDesignStaffRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<StaffWithCountDTO>> GetStaffs()
        {
            return await _repository.GetStaffs();
        }
    }
}
