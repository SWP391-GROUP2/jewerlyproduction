using JewelryProduction.DbContext;
using JewelryProduction.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        public ManagerController(JewelryProductionContext context)
        {
            _context = context;
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

    }
}
