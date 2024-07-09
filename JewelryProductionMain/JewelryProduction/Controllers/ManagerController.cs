using JewelryProduction.DbContext;
using JewelryProduction.DTO.BasicDTO;
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
        private readonly ISaleStaffService _saleStaffService;
        private readonly IHubContext<MyHub> _myhub;
        private readonly INotificationService _notificationService;
        private readonly ICustomerRequestService _requestService;
        private readonly IDesignStaffService _designStaffService;
        private readonly IProductionStaffService _productionStaffService;
        private readonly IManagerService _managerService;

        public ManagerController(JewelryProductionContext context, UserManager<AppUser> userManager, ISaleStaffService saleStaffService, IHubContext<MyHub> myhub, INotificationService notificationService, ICustomerRequestService requestService, IDesignStaffService designstaffService, IProductionStaffService productionStaffService, IManagerService managerService)
        {
            _context = context;
            _userManager = userManager;
            _saleStaffService = saleStaffService;
            _myhub = myhub;
            _notificationService = notificationService;
            _requestService = requestService;
            _designStaffService = designstaffService;
            _productionStaffService = productionStaffService;
            _managerService = managerService;
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
            try
            {
                await _managerService.AssignSaleStaffAsync(assignSaleStaffDTO);
                return Ok("SaleStaff assigned successfully.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("assignProductionStaff")]
        public async Task<IActionResult> AssignProductionStaff([FromBody] AssignProductionStaffDTO assignProductionStaffDTO)
        {
            try
            {
                await _managerService.AssignProductionStaffAsync(assignProductionStaffDTO);
                return Ok("Production Staff assigned successfully.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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

        [HttpGet("Staff/Sales/List")]
        public async Task<List<SaleStaffWithCountDTO>> GetSaleDetailsAsync()
        {
            var result = await _saleStaffService.GetStaffs();

            return result;
        }

        [HttpGet("Staff/Design/List")]
        public async Task<List<StaffWithCountDTO>> GetDesignDetailsAsync()
        {
            var result = await _designStaffService.GetStaffs();

            return result;
        }

        [HttpGet("Staff/Production/List")]
        public async Task<List<StaffWithCountDTO>> GetProductionDetailsAsync()
        {
            var result = await _productionStaffService.GetStaffs();

            return result;
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

