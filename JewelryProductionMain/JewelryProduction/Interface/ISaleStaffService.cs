using JewelryProduction.DTO;
using JewelryProduction.DTO.BasicDTO;

namespace JewelryProduction.Interface
{
    public interface ISaleStaffService
    {
        Task<decimal> CalculateProductCost(string CustomizeRequestId);
        decimal GetDeposit(decimal productCost);
        Task<List<UserWithCountDTO>> GetStaffs();
    }
}
