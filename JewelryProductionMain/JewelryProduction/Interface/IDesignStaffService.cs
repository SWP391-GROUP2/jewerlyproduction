using JewelryProduction.DTO.BasicDTO;

namespace JewelryProduction.Interface
{
    public interface IDesignStaffService
    {
        Task<List<StaffWithCountDTO>> GetStaffs();
    }
}
