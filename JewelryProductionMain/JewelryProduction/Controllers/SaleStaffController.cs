using AutoMapper;
using JewelryProduction.Common;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.DTO.BasicDTO;
using JewelryProduction.Entities;
using JewelryProduction.Interface;
using JewelryProduction.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleStaffController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly ISaleStaffService _service;
        private readonly INotificationService _notificationService;
        private readonly ICustomerRequestService _requestService;
        private readonly IMapper _mapper;

        public SaleStaffController(JewelryProductionContext context, ISaleStaffService service, INotificationService notificationService, ICustomerRequestService requestService, IMapper mapper)
        {
            _context = context;
            _service = service;
            _notificationService = notificationService;
            _requestService = requestService;
            _mapper = mapper;
        }

        [HttpGet("Wait-for-Quotation-requests")]
        public async Task<ActionResult<IEnumerable<CustomerRequest>>> GetPendingRequests()
        {
            var pendingRequests = await _context.CustomerRequests
                .Where(r => r.Status == "Wait for Quotation" )
                .ToListAsync();

            return Ok(pendingRequests);
        }
        [HttpPost("send-quotation-to-Customer")]
        public async Task<IActionResult> ApproveCustomerRequest(string customerRequestId)
        {
            var success = await _requestService.SendQuotation(customerRequestId, GetCurrentUserId());

            if (!success)
            {
                return BadRequest("Failed to approve customer request.");
            }

            return Ok("Customer request approved successfully.");
        }

        [HttpPost("send-approved")]
        public async Task<ActionResult> SendForApproval(string CustomizeRequestId)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(CustomizeRequestId);
            var gold = await _context.Golds.FindAsync(customerRequest.GoldId);
            var gemstones = await _context.Gemstones
            .Where(g => customerRequest.CustomizeRequestId.Contains(g.CustomizeRequestId))
            .ToListAsync();
            var senderId = GetCurrentUserId();
            var price = await _service.CalculateProductCost(CustomizeRequestId);
            var request = await _context.CustomerRequests.FindAsync(CustomizeRequestId);
            var userId = request.ManagerId;
            request.quotationDes = @$"
Gemstone Price:             {gemstones.Sum(x => x.Price)}
Gold Price:             {gold.PricePerGram * (decimal)customerRequest.GoldWeight}
Production Cost:            40% Material Price
Additional Fee:             0
VAT:                        10%";
            request.quotation = price;
            request.Status = "Wait For Approve"; 
            await _context.SaveChangesAsync();

            // Send email or notification to manager
           await _notificationService.SendNotificationToUserfAsync(userId,senderId,$"There is new request with ID: {CustomizeRequestId} that need to be approved.");

            return Ok("Approval request sent to the manager.");
        }
        private string GetCurrentUserId()
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sid);
            return userId;
        }

        [HttpGet("Detail")]
        public async Task<List<UserWithCountDTO>> GetDetailsAsync()
        {
            var result = await _service.GetStaffs();

            return result;  
        }
    }
}

