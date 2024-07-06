using Firebase.Auth;
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
    public class ProductionStaffController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly INotificationService _notificationService;
        public ProductionStaffController(JewelryProductionContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        [HttpPost("record-inspection")]
        public async Task<IActionResult> RecordInspection([FromBody] InspectionDTO inspection, string senderId)
        {
            var order = await _context.Orders.FindAsync(inspection.OrderId);
            if (order == null)
            {
                return NotFound("Order not found");
            }
            var userId = order.CustomizeRequest.ManagerId;
            var newInspection = new Inspection
            {
                OrderId = inspection.OrderId,
                Stage = inspection.Stage,
                ProductStaffId = inspection.ProductStaffId,
                InspectionDate = DateTime.Now,
                Result = inspection.Result,
                Comment = inspection.Comment
            };

            _context.Inspections.Add(newInspection);

            if (inspection.Result == "Fail")
            {
                order.Status = "Failed";
                await _notificationService.SendNotificationToUserfAsync(userId, senderId, inspection.Comment);

                return Ok("Inspection recorded was sent to the manager.");
            }

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
    }
}
