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
        private readonly IEmailService _emailService;
        private readonly IOrderService _orderService;
        public ProductionStaffController(JewelryProductionContext context,IEmailService emailService ,IOrderService orderService, ICustomerRequestService customerRequestService)
        {
            _context = context;
            _orderService = orderService;
            _emailService = emailService;
        }
        [HttpPut("record-inspection")]
        public async Task<IActionResult> RecordInspection(string orderId, string stage, [FromBody] InspectionDTO inspectionDto)
        {
            if (inspectionDto.Result == false)
            {
                var userId = _orderService.GetManagerIdByOrderId(orderId);
                await _emailService.SendEmail(userId, "Production Error", inspectionDto.Comment);
            }
            return await _orderService.RecordInspection(orderId, stage, inspectionDto);
        }
        [HttpPut("updateStatus")]
        public async Task<IActionResult> UpdateOrderStatus([FromQuery] string orderId, string stage) 
        {
            var userId = _orderService.GetCustomerIdByOrderId(orderId);
            await _emailService.SendEmail(userId, "Order notification", $@"Your Order {orderId} has been completed");
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
