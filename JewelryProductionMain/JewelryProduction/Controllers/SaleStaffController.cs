using AutoMapper;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
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
        public async Task<IActionResult> SendForApproval(string customizeRequestId, double goldWeight)
        {
            var senderId = GetCurrentUserId();
            var result = await _service.SendForApprovalAsync(customizeRequestId, goldWeight, senderId);
            if (result)
            {
                return Ok("Approval request sent to the manager.");
            }
            return BadRequest("Failed to send approval request.");
        }

        [HttpPut("update-approved")]
        public async Task<IActionResult> UpdateSendForApproval(string customizeRequestId, double goldWeight)
        {
            var senderId = GetCurrentUserId();
            var result = await _service.SendForApprovalAsync(customizeRequestId, goldWeight, senderId);
            if (result)
            {
                return Ok("Approval request sent to the manager.");
            }
            return BadRequest("Failed to send approval request.");
        }

        [HttpPost("updateCustomerRequestQuotation")]
        public async Task<IActionResult> UpdateCustomerRequestQuotation([FromBody] UpdateQuotationDTO updateQuotationDTO)
        {
            var senderId = GetCurrentUserId();
            var result = await _service.UpdateCustomerRequestQuotation(updateQuotationDTO.CustomerRequestId, updateQuotationDTO.NewQuotation, updateQuotationDTO.NewQuotationDes, senderId);
            if (result)
            {
                return Ok("Quotation updated successfully.");
            }
            return BadRequest("Failed to update quotation.");
        }

        private string GetCurrentUserId()
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sid);
            return userId;
        }
    }
}

