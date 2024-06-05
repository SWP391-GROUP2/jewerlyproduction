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
using NuGet.Packaging.Signing;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        public MessagesController(JewelryProductionContext context)
        {
            _context = context;
        }

        // GET: api/Messages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            return await _context.Messages.ToListAsync();
        }

        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(string id)
        {
            var message = await _context.Messages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        // PUT: api/Messages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessage(string id, MessageDTO messageDTO)
        {
            if (id != messageDTO.MessageId)
            {
                return BadRequest();
            }

            var updateMessage = await _context.Messages.FindAsync(id);
            updateMessage.MessageId = messageDTO.MessageId;
            updateMessage.MessageText = messageDTO.MessageText;
            updateMessage.Timestamp = messageDTO.Timestamp;
            updateMessage.SaleStaffId = messageDTO.SaleStaffId;
            updateMessage.CustomerId = messageDTO.CustomerId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageExists(id))
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

        // POST: api/Messages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(MessageDTO messageDTO)
        {
            var message = new Message
            {
                MessageId = messageDTO.MessageId,
                MessageText = messageDTO.MessageText,
                Timestamp = messageDTO.Timestamp,
                SaleStaffId = messageDTO.SaleStaffId,
                CustomerId = messageDTO.CustomerId,
            };
            _context.Messages.Add(message);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MessageExists(message.MessageId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMessage", new { id = message.MessageId }, message);
        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(string id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MessageExists(string id)
        {
            return _context.Messages.Any(e => e.MessageId == id);
        }
    }
}
