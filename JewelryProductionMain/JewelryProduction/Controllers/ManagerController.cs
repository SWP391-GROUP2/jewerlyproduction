using JewelryProduction.DbContext;
using JewelryProduction.Entities;
using JewelryProduction.Interface;
using JewelryProduction.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly ISaleStaffService _staffService;
        private readonly IHubContext<MyHub> _myhub;
        private readonly INotificationService _notificationService;
        private readonly ICustomerRequestService _requestService;

        public ManagerController(JewelryProductionContext context, UserManager<AppUser> userManager, ISaleStaffService staffService, IHubContext<MyHub> myhub, INotificationService notificationService, ICustomerRequestService requestService)
        {
            _context = context;
            _userManager = userManager;
            _staffService = staffService;
            _myhub = myhub;
            _notificationService = notificationService;
            _requestService = requestService;
        }
        [HttpPost("approveQuotation/{customerRequestId}")]
        public async Task<IActionResult> ApproveCustomerRequest(string customerRequestId)
        {
            var managerId = GetCurrentUserId();
            var success = await _requestService.ApproveQuotation(customerRequestId, managerId);

            if (!success)
            {
                return BadRequest("Failed to approve customer request.");
            }

            return Ok("Customer request approved successfully.");
        }
        [HttpPost("rejectQuotation/{customerRequestId}")]
        public async Task<IActionResult> RejectQuotation(string customerRequestId, string message)
        {
            var managerId = GetCurrentUserId();
            var success = await _requestService.RejectQuotation(customerRequestId, managerId, message);

            if (!success)
            {
                return BadRequest("Failed to reject customer request.");
            }

            return Ok("Customer request rejected successfully.");
        }
        [HttpPost("assignSaleStaff")]
        public async Task<IActionResult> AssignSaleStaff([FromBody] AssignSaleStaffDTO assignSaleStaffDTO)
        {
            var customerRequest = await _context.CustomerRequests
                .FirstOrDefaultAsync(cr => cr.CustomizeRequestId == assignSaleStaffDTO.CustomizeRequestId);

            if (customerRequest == null)
            {
                return NotFound("CustomerRequest not found.");
            }

            var saleStaff = await _userManager.FindByIdAsync(assignSaleStaffDTO.SaleStaffId);
            if (saleStaff == null)
            {
                return NotFound("SaleStaff not found.");
            }

            var isSaleStaff = await _userManager.IsInRoleAsync(saleStaff, "SaleStaff");
            if (!isSaleStaff)
            {
                return BadRequest("The user is not assigned the SaleStaff role.");
            }

            customerRequest.SaleStaffId = assignSaleStaffDTO.SaleStaffId;
            customerRequest.ManagerId = assignSaleStaffDTO.ManagerId;
            customerRequest.Status = "Wait for Quotation"; 

            _context.CustomerRequests.Update(customerRequest);
            await _context.SaveChangesAsync();

            return Ok("SaleStaff assigned successfully.");
        }
        [HttpPost("assignProductionStaff")]
        public async Task<IActionResult> AssignProductionStaff([FromBody] AssignProductionStaffDTO assignProductionStaffDTO)
        {
            var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.OrderId == assignProductionStaffDTO.OrderId);

            if (order == null)
            {
                return NotFound("Order not found.");
            }

            var productionStaff = await _userManager.FindByIdAsync(assignProductionStaffDTO.ProductionStaffId);
            if (productionStaff == null)
            {
                return NotFound("Production Staff not found.");
            }

            var isProductionStaff = await _userManager.IsInRoleAsync(productionStaff, "ProductionStaff");
            if (!isProductionStaff)
            {
                return BadRequest("The user is not assigned the ProductionStaff role.");
            }

            order.ProductionStaffId = assignProductionStaffDTO.ProductionStaffId;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return Ok("Production Staff assigned successfully.");
        }
            [HttpPost("sendNotificationToCustomers")]
        public async Task<IActionResult> SendNotificationToCustomers([FromBody] string message)
        {
            var senderId = GetCurrentUserId();
            await _notificationService.SendNotificationToRoleAsync("Customer",senderId,message);

            return Ok("Notification sent to customers.");
        }
        private string GetCurrentUserId()
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sid);
                return userId;
        }
    }

    public class AssignSaleStaffDTO
    {
        public string CustomizeRequestId { get; set; } = null!;
        public string ManagerId { get; set; }
        public string SaleStaffId { get; set; } = null!;
    }
    public class AssignProductionStaffDTO
    {
        public string OrderId { get; set; }
        public string ProductionStaffId { get; set; }
    }

}

