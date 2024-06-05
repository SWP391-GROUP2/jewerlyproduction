using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JewelryProduction;
using JewelryProduction.Core;
using JewelryProduction.Core.DTO;
using Humanizer;
using System.Drawing;

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
            if (id != customerRequestDTO.CustomizeRequestId)
            {
                return BadRequest();
            }
            var updateRequest = await _context.CustomerRequests.FindAsync(id);
            updateRequest.CustomizeRequestId = customerRequestDTO.CustomizeRequestId;
            updateRequest.GoldId = customerRequestDTO.GoldId;
            updateRequest.CustomerId = customerRequestDTO.CustomerId;
            updateRequest.Type = customerRequestDTO.Type;
            updateRequest.Style = customerRequestDTO.Style;
            updateRequest.Size = customerRequestDTO.Size;
            updateRequest.Quantity = customerRequestDTO.Quantity;

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

        // POST: api/CustomerRequests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerRequest>> PostCustomerRequest(CustomerRequestDTO customerRequestDTO)
        {
            var customerRequest = new CustomerRequest
            {
                CustomizeRequestId = customerRequestDTO.CustomizeRequestId,
                GoldId = customerRequestDTO.GoldId,
                CustomerId = customerRequestDTO.CustomerId,
                Type = customerRequestDTO.Type,
                Style = customerRequestDTO.Style,
                Size = customerRequestDTO.Size,
                Quantity = customerRequestDTO.Quantity
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
    }
}
