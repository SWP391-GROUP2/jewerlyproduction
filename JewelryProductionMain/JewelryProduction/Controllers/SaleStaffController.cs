using JewelryProduction.Common;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Entities;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleStaffController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly ISaleStaffService _service;
        private readonly INotificationService _notificationService;

        public SaleStaffController(JewelryProductionContext context, ISaleStaffService service, INotificationService notificationService)
        {
            _context = context;
            _service = service;
            _notificationService = notificationService;
        }

        [HttpGet("Wait-for-Quotation-requests")]
        public async Task<ActionResult<IEnumerable<CustomerRequest>>> GetPendingRequests()
        {
            var pendingRequests = await _context.CustomerRequests
                .Where(r => r.Status == "Wait for Quotation" )
                .ToListAsync();

            return Ok(pendingRequests);
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
        [HttpPost("send-approved")]
        public async Task<ActionResult> SendForApproval(string CustomizeRequestId)
        {
            var price = await _service.CalculateProductCost(CustomizeRequestId);
            var uniqueId = await IdGenerator.GenerateUniqueId<ApprovalRequest>(_context, "AR", 3);
            var approvalRequest = new ApprovalRequest
            {
                ApprovalRequestId = uniqueId,
                CustomerRequestId = CustomizeRequestId,
                Price = price,
                Status = "Pending",
                CreatedAt = DateTime.Now
            };

            _context.ApprovalRequests.Add(approvalRequest);
            await _context.SaveChangesAsync();

            // Send email or notification to manager
           await _notificationService.SendNotificationToUserAsync("ADM000",$"There is new request with ID: {CustomizeRequestId} that need to be approved.");

            return Ok("Approval request sent to the manager.");
        }
    }
}

