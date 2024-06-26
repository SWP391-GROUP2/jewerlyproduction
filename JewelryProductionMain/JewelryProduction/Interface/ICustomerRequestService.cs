using JewelryProduction.Common;
using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface ICustomerRequestService
    {
        Task<PagedResult<CustomerRequest>> GetAllPaging(OrderPagingRequest request);
    }
}
