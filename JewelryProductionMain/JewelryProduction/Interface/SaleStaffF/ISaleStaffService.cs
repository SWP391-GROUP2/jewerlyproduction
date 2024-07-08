using JewelryProduction.DTO.BasicDTO;

namespace JewelryProduction.Interface
{
    public interface ISaleStaffService
    {
        Task<double> CalculateProductCost(string CustomizeRequestId);
        double GetDeposit(double productCost);
        Task<List<SaleStaffWithCountDTO>> GetStaffs();
    }
}
