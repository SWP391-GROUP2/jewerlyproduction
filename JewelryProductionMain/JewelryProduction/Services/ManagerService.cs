using JewelryProduction.Common;
using JewelryProduction.Controllers;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Entities;
using JewelryProduction.Interface;
using JewelryProduction.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Services
{
    public class ManagerService : IManagerService
    {
        private readonly JewelryProductionContext _context;
        private readonly ICustomerRequestRepository _customerRequestRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IInspectionRepository _inspectionRepository;
        private readonly UserManager<AppUser> _userManager;

        public ManagerService(ICustomerRequestRepository customerRequestRepository, IOrderRepository orderRepository, IUserRepository userRepository, IInspectionRepository inspectionRepository, UserManager<AppUser> userManager, JewelryProductionContext context)
        {
            _customerRequestRepository = customerRequestRepository;
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _inspectionRepository = inspectionRepository;
            _userManager = userManager;
            _context = context;
        }

        public async Task AssignSaleStaffAsync(AssignSaleStaffDTO assignSaleStaffDTO)
        {
            var customerRequest = await _customerRequestRepository.GetByIdAsync(assignSaleStaffDTO.CustomizeRequestId);
            if (customerRequest == null) throw new KeyNotFoundException("CustomerRequest not found.");

            var saleStaff = await _userRepository.GetByIdAsync(assignSaleStaffDTO.SaleStaffId);
            if (saleStaff == null) throw new KeyNotFoundException("SaleStaff not found.");

            var isSaleStaff = await _userManager.IsInRoleAsync(saleStaff, "SaleStaff");
            if (!isSaleStaff) throw new InvalidOperationException("The user is not assigned the SaleStaff role.");

            customerRequest.SaleStaffId = assignSaleStaffDTO.SaleStaffId;
            customerRequest.ManagerId = assignSaleStaffDTO.ManagerId;
            customerRequest.Status = "Wait for Quotation";

            _customerRequestRepository.Update(customerRequest);
            await _customerRequestRepository.SaveChangesAsync();
        }

        public async Task AssignProductionStaffAsync(AssignProductionStaffDTO assignProductionStaffDTO)
        {
            var order = await _orderRepository.GetByIdAsync(assignProductionStaffDTO.OrderId);
            if (order == null) throw new KeyNotFoundException("Order not found.");
            if (order.DesignStaffId == null) throw new InvalidOperationException("Order need to be assigned to Design Staff first");

            var productionStaff = await _userRepository.GetByIdAsync(assignProductionStaffDTO.ProductionStaffId);
            if (productionStaff == null) throw new KeyNotFoundException("Production Staff not found.");

            var isProductionStaff = await _userManager.IsInRoleAsync(productionStaff, "ProductionStaff");
            if (!isProductionStaff) throw new InvalidOperationException("The user is not assigned the ProductionStaff role.");

            order.ProductionStaffId = assignProductionStaffDTO.ProductionStaffId;
            _orderRepository.Update(order);

            var inspections = new List<Inspection>
        {
            new Inspection
            {
                InspectionId = await IdGenerator.GenerateUniqueId<Inspection>(_context, "I", 6),
                OrderId = assignProductionStaffDTO.OrderId,
                InspectionDate = DateTime.Now,
                ProductStaffId = assignProductionStaffDTO.ProductionStaffId,
                Stage = "Material Checking",
                Result = null,
                Comment = null,
            },
            new Inspection
            {
                InspectionId = await IdGenerator.GenerateUniqueId<Inspection>(_context, "I", 6),
                OrderId = assignProductionStaffDTO.OrderId,
                InspectionDate = DateTime.Now,
                ProductStaffId = assignProductionStaffDTO.ProductionStaffId,
                Stage = "In Production Progress",
                Result = null,
                Comment = null,
            },
            new Inspection
            {
                InspectionId = await IdGenerator.GenerateUniqueId<Inspection>(_context, "I", 6),
                OrderId = assignProductionStaffDTO.OrderId,
                InspectionDate = DateTime.Now,
                ProductStaffId = assignProductionStaffDTO.ProductionStaffId,
                Stage = "Final Inspection",
                Result = null,
                Comment = null,
            }
        };

            foreach (var inspection in inspections)
            {
                await _inspectionRepository.AddAsync(inspection);
            }

            await _inspectionRepository.SaveChangesAsync();
        }
    }
}
