using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface ISaleStaffService
    {
        Task<decimal> CalculateProductCost(string CustomizeRequestId);
        decimal GetDeposit(decimal productCost);
    }
}
