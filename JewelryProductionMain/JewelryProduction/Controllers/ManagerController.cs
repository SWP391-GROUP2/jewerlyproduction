using JewelryProduction.DbContext;
using JewelryProduction.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly UserManager<AppUser> _userManager;

        public ManagerController(JewelryProductionContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("ApprovalPriceList")]
        public async Task<ActionResult<List<ApprovalRequest>>> GetApprovalPriceList(string status)
        {
            var approvalPrices = await _context.ApprovalRequests
                .Where(ar => ar.Status == status)
                .Select(ar => new ApprovalRequest
                {
                   ApprovalRequestId = ar.ApprovalRequestId,
                   CustomerRequestId = ar.CustomerRequestId,
                   Price = ar.Price,
                   Status = status,
                   CreatedAt = ar.CreatedAt
                })
                .ToListAsync();

            return Ok(approvalPrices);
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
            customerRequest.ManagerId = GetCurrentUserId();
            customerRequest.Status = "Wait for Quotation"; 

            _context.CustomerRequests.Update(customerRequest);
            await _context.SaveChangesAsync();

            return Ok("SaleStaff assigned successfully.");
        }
        public string GetCurrentUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                return userId;
        }
    }

    public class AssignSaleStaffDTO
    {
        public string CustomizeRequestId { get; set; } = null!;
        public string SaleStaffId { get; set; } = null!;
    }

}

