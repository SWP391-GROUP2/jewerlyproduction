using JewelryProduction.Common;
using JewelryProduction.DTO;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Interface
{
    public interface ICustomerRequestService
    {
        Task<PagedResult<CustomerRequest>> GetAllPaging(OrderPagingRequest request);
        Task<CustomerRequest> GetCustomerRequestWithQuotationsAsync(string customerRequestId);
        Task<bool> ApproveCustomerRequest(string customerRequestId);
        Task<bool> RejectQuotation(string customerRequestId, string message);
    }
}
