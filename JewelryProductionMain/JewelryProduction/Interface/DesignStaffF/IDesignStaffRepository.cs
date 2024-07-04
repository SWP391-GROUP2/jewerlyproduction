using JewelryProduction.DTO.BasicDTO;

namespace JewelryProduction.Interface
{
    public interface IDesignStaffRepository
    {
        Task<List<StaffWithCountDTO>> GetStaffs();
    }
}
