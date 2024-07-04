using JewelryProduction.DTO.BasicDTO;

namespace JewelryProduction.Interface
{
    public interface IProductionStaffRepository
    {
        Task<List<StaffWithCountDTO>> GetStaffs();
    }
}
