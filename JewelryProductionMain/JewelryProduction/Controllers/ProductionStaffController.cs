using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using JewelryProduction.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductionStaffController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly INotificationService _notificationService;
        public ProductionStaffController(JewelryProductionContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }
        [HttpPut("record-inspection")]
        public async Task<IActionResult> RecordInspection(string orderId, string stage, [FromBody] InspectionDTO inspectionDto)
        {
            var order = await _context.Orders
                .Include(o => o.ProductionStaff)
                .Include(o => o.CustomizeRequest)
                .Where(o => o.OrderId == orderId)
                .FirstOrDefaultAsync();

            var inspection = await _context.Inspections
                .Where(i => i.OrderId == orderId && i.Stage == stage)
                .FirstOrDefaultAsync();
            if (order == null)
            {
                return NotFound("Order not found");
            }
            var userId = order.CustomizeRequest.ManagerId;
            var senderId = GetCurrentUserId();
            inspection.Result = inspectionDto.Result;
            inspection.Comment = inspectionDto.Comment;
            if (inspection.Result is false)
            {
                await _notificationService.SendNotificationToUserfAsync(userId, senderId, inspection.Comment);

                return Ok("Inspection recorded was sent to the manager.");
            }
            if (stage == "Final Inspection" && inspection.Result is true) order.Status = "Completed";

            await _context.SaveChangesAsync();

            return Ok("Inspection recorded successfully");
        }
        [HttpGet("quality-checklist/{stage}")]
        public async Task<IActionResult> GetQualityChecklist(string stage)
        {
            var checklist = await _context.QualityCheckLists
                .Where(c => c.Stage == stage)
                .ToListAsync();

            if (!checklist.Any())
            {
                return NotFound("No checklist items found for this stage");
            }

            return Ok(checklist);
        }
        private string GetCurrentUserId()
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sid);
            return userId;
        }
    }
}
