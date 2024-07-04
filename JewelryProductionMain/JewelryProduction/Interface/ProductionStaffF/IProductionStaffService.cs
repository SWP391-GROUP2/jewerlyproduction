using JewelryProduction.DTO.BasicDTO;

namespace JewelryProduction.Interface
{
    public interface IProductionStaffService
    {
        Task<List<StaffWithCountDTO>> GetStaffs();
    }
}
