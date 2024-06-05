using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JewelryProduction;
using JewelryProduction.Core;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class _3ddesignController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        public _3ddesignController(JewelryProductionContext context)
        {
            _context = context;
        }

        // GET: api/_3ddesign
        [HttpGet]
        public async Task<ActionResult<IEnumerable<_3ddesign>>> Get_3ddesigns()
        {
            return await _context._3ddesigns.ToListAsync();
        }

        // GET: api/_3ddesign/5
        [HttpGet("{id}")]
        public async Task<ActionResult<_3ddesign>> Get_3ddesign(string id)
        {
            var _3ddesign = await _context._3ddesigns.FindAsync(id);

            if (_3ddesign == null)
            {
                return NotFound();
            }

            return _3ddesign;
        }

        // PUT: api/_3ddesign/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Put_3ddesign(string id, _3ddesign _3ddesign)
        {
            if (id != _3ddesign._3dDesignId)
            {
                return BadRequest();
            }

            _context.Entry(_3ddesign).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_3ddesignExists(id))
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

        // POST: api/_3ddesign
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<_3ddesign>> Post_3ddesign(_3ddesign _3ddesign)
        {
            _context._3ddesigns.Add(_3ddesign);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (_3ddesignExists(_3ddesign._3dDesignId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("Get_3ddesign", new { id = _3ddesign._3dDesignId }, _3ddesign);
        }

        // DELETE: api/_3ddesign/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete_3ddesign(string id)
        {
            var _3ddesign = await _context._3ddesigns.FindAsync(id);
            if (_3ddesign == null)
            {
                return NotFound();
            }

            _context._3ddesigns.Remove(_3ddesign);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool _3ddesignExists(string id)
        {
            return _context._3ddesigns.Any(e => e._3dDesignId == id);
        }
    }
}
