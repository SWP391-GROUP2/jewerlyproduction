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
        [HttpPost("approve/{customerRequestId}")]
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
        [HttpPost("reject/{customerRequestId}")]
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
        [HttpPost("approve-request/{id}")]
        public async Task<IActionResult> ApproveRequest(string id)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(id);
            if (customerRequest == null)
            {
                return NotFound();
            }

            customerRequest.Status = "Approved";
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("reject-request/{id}")]
        public async Task<IActionResult> RejectRequest(string id)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(id);
            if (customerRequest == null)
            {
                return NotFound();
            }

            customerRequest.Status = "Rejected";
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("pending-requests")]
        public async Task<ActionResult<IEnumerable<CustomerRequest>>> GetPendingRequests()
        {
            var pendingRequests = await _context.CustomerRequests
                .Where(r => r.Status == "Pending")
                .ToListAsync();

            return Ok(pendingRequests);
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

}

