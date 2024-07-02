using Firebase.Auth;
using JewelryProduction.DTO.BasicDTO;

namespace JewelryProduction.Interface
{
    public interface ISaleStaffRepository
    {
        Task<List<UserWithCountDTO>> GetStaffs();
    }
}
