
using JewelryProduction.Common;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerRequestsController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        public CustomerRequestsController(JewelryProductionContext context)
        {
            _context = context;
        }

        // GET: api/CustomerRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerRequest>>> GetCustomerRequests()
        {
            return await _context.CustomerRequests.ToListAsync();
        }

        // GET: api/CustomerRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerRequest>> GetCustomerRequest(string id)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(id);

            if (customerRequest == null)
            {
                return NotFound();
            }

            return customerRequest;
        }

        // PUT: api/CustomerRequests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerRequest(string id, CustomerRequestDTO customerRequestDTO)
        {
            var gemstones = await _context.Gemstones
            .Where(g => customerRequestDTO.GemstoneName.Contains(g.Name))
            .ToListAsync();

            if (gemstones.Count != customerRequestDTO.GemstoneName.Count)
            {
                return BadRequest("Some gemstones were not found.");
            }
            var gold = await _context.Golds
            .FirstOrDefaultAsync(g => g.GoldType == customerRequestDTO.GoldType);

            if (gold == null)
            {
                return BadRequest("Gold type not found.");
            }
            if (id != customerRequestDTO.CustomizeRequestId)
            {
                return BadRequest();
            }

            var updateCusReq = await _context.CustomerRequests.FindAsync(id);
            updateCusReq.CustomizeRequestId = customerRequestDTO.CustomizeRequestId;
            updateCusReq.GoldId = gold.GoldId;
            updateCusReq.CustomerId = customerRequestDTO.CustomerId;
            updateCusReq.Type = customerRequestDTO.Type;
            updateCusReq.Style = customerRequestDTO.Style;
            updateCusReq.Size = customerRequestDTO.Size;
            updateCusReq.Quantity = customerRequestDTO.Quantity;
            updateCusReq.Status = customerRequestDTO.Status;
            updateCusReq.Gemstones = gemstones;
            updateCusReq.Gold = gold;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerRequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpGet("customize-form-template")]
        public ActionResult<CustomerRequestDTO> GetCustomizeFormTemplate([FromQuery] string type)
        {
            if (string.IsNullOrEmpty(type))
            {
                return BadRequest("Type must be provided.");
            }

            var template = new CustomerRequestDTO
            {
                Type = type
            };

            return Ok(template);
        }

        // POST: api/CustomerRequests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerRequest>> PostCustomerRequest(CustomerRequestDTO customerRequestDTO)
        {
            var gemstones = await _context.Gemstones
            .Where(g => customerRequestDTO.GemstoneName.Contains(g.Name))
            .ToListAsync();

            if (gemstones.Count != customerRequestDTO.GemstoneName.Count)
            {
                return BadRequest("Some gemstones were not found.");
            }
            var gold = await _context.Golds
            .FirstOrDefaultAsync(g => g.GoldType == customerRequestDTO.GoldType);

            if (gold == null)
            {
                return BadRequest("Gold type not found.");
            }
            var uniqueId = await IdGenerator.GenerateUniqueId<CustomerRequest>(_context, "REQ", 3);

            var customerRequest = new CustomerRequest
            {
                CustomizeRequestId = uniqueId,
                GoldId = gold.GoldId,
                CustomerId = customerRequestDTO.CustomerId,
                Type = customerRequestDTO.Type,
                Style = customerRequestDTO.Style,
                Size = customerRequestDTO.Size,
                Quantity = customerRequestDTO.Quantity,
                Gemstones = gemstones,
                Gold = gold,
                Status = "Pending"
            };
            _context.CustomerRequests.Add(customerRequest);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CustomerRequestExists(customerRequest.CustomizeRequestId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCustomerRequest", new { id = customerRequest.CustomizeRequestId }, customerRequest);
        }

        // DELETE: api/CustomerRequests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerRequest(string id)
        {
            var customerRequest = await _context.CustomerRequests.FindAsync(id);
            if (customerRequest == null)
            {
                return NotFound();
            }

            _context.CustomerRequests.Remove(customerRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerRequestExists(string id)
        {
            return _context.CustomerRequests.Any(e => e.CustomizeRequestId == id);
        }
        [HttpGet("prefill")]
        public async Task<IActionResult> PrefillCustomizeRequest([FromQuery] string productSampleId)
        {
            var productSample = await _context.ProductSamples
                .Where(ps => ps.ProductSampleId == productSampleId)
                .Select(ps => new CustomerRequestDTO
                {
                    Type = ps.Type,
                    Style = ps.Style,
                    Quantity = 1, // Default quantity, adjust as necessary
                    GemstoneName = ps.Gemstones.Select(g => g.Name).ToList(),
                    GoldType = ps.Gold.GoldType,
                })
                .FirstOrDefaultAsync();

            if (productSample == null)
            {
                return NotFound("Product sample not found.");
            }

            return Ok(productSample);
        }
        [HttpPost("approve/{customizeRequestId}")]
        public async Task<IActionResult> ApproveCustomerRequest(string customizeRequestId)
        {
            var customerRequest = await _context.CustomerRequests
                .Include(cr => cr.Gemstones)
                .Include(cr => cr.Gold)
                .FirstOrDefaultAsync(cr => cr.CustomizeRequestId == customizeRequestId);

            if (customerRequest == null)
            {
                return NotFound("Customer request not found.");
            }

            customerRequest.Status = "Approved";
            var request = await _context.ApprovalRequests
                .Where(ar => ar.CustomerRequestId == customizeRequestId && ar.Status == "Approved")
                .FirstOrDefaultAsync();

            var order = new Order
            {
                OrderId = await IdGenerator.GenerateUniqueId<Order>(_context, "ORD", 6),
                CustomerId = customerRequest.CustomerId,
               // SaleStaffId = 
               // ManagerId = 
               // ProductionStaffId = null, 
                OrderDate = DateTime.Now,
                DepositAmount = request.Price *0.3M, 
                Status = "Pending",
                ProductSampleId = null,
                CustomizeRequestId = customerRequest.CustomizeRequestId,
                //PaymentMethodId = 
                TotalPrice = request.Price
            };

            _context.Orders.Add(order);

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }

            return Ok(order);
        }
        [HttpDelete("reject/{customizeRequestId}")]
        public async Task<IActionResult> RejectCustomerRequest(string customizeRequestId)
        {
            var customerRequest = await _context.CustomerRequests
                .Include(cr => cr.Gemstones)
                .FirstOrDefaultAsync(cr => cr.CustomizeRequestId == customizeRequestId);
            if (customerRequest == null)
            {
                return NotFound("Customer request not found.");
            }
            foreach (var gemstone in customerRequest.Gemstones)
            {
                gemstone.CustomizeRequestId = null;
            }
            _context.CustomerRequests.Remove(customerRequest);
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }

            return NoContent();
        }
    }
}