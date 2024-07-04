using JewelryProduction.Common;
using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Interface
{
    public interface ICustomerRequestService
    {
        Task<PagedResult<CustomerRequest>> GetAllPaging(OrderPagingRequest request);
        Task<CustomerRequest> GetCustomerRequestWithQuotationsAsync(string customerRequestId);
        Task<bool> ApproveQuotation(string customerRequestId, string managerId);
        Task<bool> RejectQuotation(string customerRequestId, string managerId, string message);
        Task<bool> UpdateCustomerRequestQuotation(string customerRequestId, decimal newQuotation, string newQuotationDes);
        Task<bool> SendQuotation(string customerRequestId, string staffId);
        Task<List<CustomerRequestGetDTO>> GetCustomerRequests();
        Task<CustomerRequestGetDTO> GetCustomerRequest(string id);
    }
}
