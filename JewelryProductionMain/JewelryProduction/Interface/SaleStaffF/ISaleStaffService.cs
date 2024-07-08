using JewelryProduction.DTO;
using JewelryProduction.DTO.BasicDTO;

namespace JewelryProduction.Interface
{
    public interface ISaleStaffService
    {
        Task<bool> SendForApprovalAsync(string customizeRequestId, double goldWeight, string senderId);
        Task<decimal> CalculateProductCost(string CustomizeRequestId);
        decimal GetDeposit(decimal productCost);
        Task<bool> UpdateCustomerRequestQuotation(string customerRequestId, decimal newQuotation, string newQuotationDes, string senderId);
        Task<List<SaleStaffWithCountDTO>> GetStaffs();
    }
}
