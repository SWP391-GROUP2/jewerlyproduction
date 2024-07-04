using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class CustomerRequestRepository : ICustomerRequestRepository
    {
        private readonly JewelryProductionContext _context;
        public CustomerRequestRepository(JewelryProductionContext context)
        {
            _context = context;
        }

        public async Task<List<CustomerRequestGetDTO>> GetCustomerRequests()
        {
            var requests = await _context.CustomerRequests
                .Include(cr => cr.Customer)
                .Include(cr => cr.SaleStaff)
                .Include(cr => cr.Manager)
                .Include(cr => cr.Gold)
                .ToListAsync();

            var result = requests.Select(r => new CustomerRequestGetDTO
            {
                CustomerRequest = r,
                CustomerName = r.Customer.Name,
                SaleStaffName = r.SaleStaff?.Name,
                ManagerName = r.Manager?.Name,
                GoldType = r.Gold.GoldType
            }).ToList();

            return result;
        }

        public async Task<CustomerRequestGetDTO> GetCustomerRequest(string id)
        {
            var customerRequest = await _context.CustomerRequests
                .Include(cr => cr.Customer)
                .Include(cr => cr.SaleStaff)
                .Include(cr => cr.Manager)
                .Include(cr => cr.Gold)
                .Where(cr => cr.CustomizeRequestId.Equals(id))
                .FirstOrDefaultAsync();

            if (customerRequest == null)
                return null;

            var result = new CustomerRequestGetDTO
            {
                CustomerRequest = customerRequest,
                CustomerName = customerRequest.Customer.Name,
                SaleStaffName = customerRequest.SaleStaff?.Name,
                ManagerName = customerRequest.Manager?.Name,
                GoldType = customerRequest.Gold.GoldType
            };
            return result;
        }
    }
}
