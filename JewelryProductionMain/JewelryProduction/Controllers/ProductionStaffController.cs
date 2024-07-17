using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using JewelryProduction.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using JewelryProduction.Services;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductionStaffController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly INotificationService _notificationService;
        private readonly IOrderService _orderService;
        public ProductionStaffController(JewelryProductionContext context, INotificationService notificationService, IOrderService orderService, ICustomerRequestService customerRequestService)
        {
            _context = context;
            _notificationService = notificationService;
            _orderService = orderService;
        }
        [HttpPut("record-inspection")]
        public async Task<IActionResult> RecordInspection(string orderId, string stage, [FromBody] InspectionDTO inspectionDto)
        {
            if (inspectionDto.Result == false)
            {
                var userId = _orderService.GetManagerIdByOrderId(orderId);
                var senderId = GetCurrentUserId();
                await _notificationService.SendNotificationToUserfAsync(userId, senderId, inspectionDto.Comment);
            }
            return await _orderService.RecordInspection(orderId, stage, inspectionDto);
        }
        [HttpPut("updateStatus")]
        public async Task<IActionResult> UpdateOrderStatus([FromQuery] string orderId, [FromQuery] string stage)
        {
            return await _orderService.UpdateFinalInspection(orderId, stage);
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
