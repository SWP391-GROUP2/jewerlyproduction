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
                .Include(cr => cr.Gemstones)
                .ToListAsync();

            var result = requests.Select(r => new CustomerRequestGetDTO
            {
                CustomizeRequestId = r.CustomizeRequestId,
                CustomerId = r.CustomerId,
                CustomerName = r.Customer.Name,
                SaleStaffId = r.SaleStaffId,
                SaleStaffName = r.SaleStaff?.Name ?? "Unknown",
                ManagerId = r.ManagerId,
                ManagerName = r.Manager?.Name ?? "Unknown",
                GoldId = r.GoldId,
                GoldType = r.Gold.GoldType,
                GoldWeight = r.GoldWeight ?? 0,
                Quantity = r.Quantity,
                Size = r.Size,
                Style = r.Style,
                Type = r.Type,
                Gemstones = r.Gemstones.ToList(),
                quotation = r.quotation ?? 0,
                quotationDes = r.quotationDes ??"None",
                Status = r.Status
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
                .Include(cr => cr.Gemstones)
                .Where(cr => cr.CustomizeRequestId.Equals(id))
                .FirstOrDefaultAsync();

            if (customerRequest == null)
                return null;
            var result = new CustomerRequestGetDTO
            {
                CustomizeRequestId = customerRequest.CustomizeRequestId,
                CustomerId = customerRequest.CustomerId,
                CustomerName = customerRequest.Customer.Name,
                SaleStaffId = customerRequest.SaleStaffId,
                SaleStaffName = customerRequest.SaleStaff?.Name ?? "Unknown",
                ManagerId = customerRequest.ManagerId,
                ManagerName = customerRequest.Manager?.Name ?? "Unknown",
                GoldId = customerRequest.GoldId,
                GoldType = customerRequest.Gold.GoldType,
                GoldWeight = customerRequest.GoldWeight ?? 0,
                Quantity = customerRequest.Quantity,
                Size = customerRequest.Size,
                Style = customerRequest.Style,
                Type = customerRequest.Type,
                Gemstones = customerRequest.Gemstones.ToList(),
                quotation = customerRequest.quotation ?? 0,
                quotationDes = customerRequest.quotationDes ?? "None" ,
                Status = customerRequest.Status
            };
            return result;
        }
        public async Task<CustomerRequest> GetByIdAsync(object id)
        {
            return await _context.CustomerRequests.FindAsync(id);
        }

        public async Task<IEnumerable<CustomerRequest>> GetAllAsync()
        {
            return await _context.CustomerRequests.ToListAsync();
        }

        public async Task AddAsync(CustomerRequest entity)
        {
            await _context.CustomerRequests.AddAsync(entity);
        }

        public void Update(CustomerRequest entity)
        {
            _context.CustomerRequests.Update(entity);
        }
        public async Task<bool> ExistsAsync(string customizeRequestId)
        {
            return await _context.CustomerRequests.AnyAsync(cr => cr.CustomizeRequestId == customizeRequestId);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<CustomerRequest> GetCustomerRequestWithDetailsAsync(string customizeRequestId)
        {
            return await _context.CustomerRequests
                .Include(cr => cr.Gemstones)
                .Include(cr => cr.Gold)
                .FirstOrDefaultAsync(cr => cr.CustomizeRequestId == customizeRequestId);
        }

        public async Task UpdateCustomerRequestAsync(CustomerRequest customerRequest)
        {
            _context.CustomerRequests.Update(customerRequest);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CloseRequest(string customerRequestId){
            var request = await _context.CustomerRequests.FindAsync(customerRequestId);
            if (request == null) return false;
            request.Status = "Canceled";
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
