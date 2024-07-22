using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Interface
{
    public interface ICustomerRequestRepository : IRepository<CustomerRequest>
    {
        Task<CustomerRequest> GetCustomerRequestWithDetailsAsync(string customizeRequestId);
        Task UpdateCustomerRequestAsync(CustomerRequest customerRequest);
        Task<List<CustomerRequestGetDTO>> GetCustomerRequests();
        Task<CustomerRequestGetDTO> GetCustomerRequest(string id);
        Task<bool> ExistsAsync(string customizeRequestId);
        Task<bool> CloseRequest(string customerRequestId);
    }
}
