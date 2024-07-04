using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Interface
{
    public interface ICustomerRequestRepository
    {
        Task<List<CustomerRequestGetDTO>> GetCustomerRequests();
        Task<CustomerRequestGetDTO> GetCustomerRequest(string id);
    }
}
