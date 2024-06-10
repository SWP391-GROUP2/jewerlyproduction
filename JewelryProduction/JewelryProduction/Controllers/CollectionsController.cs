using JewelryProduction.Core;
using JewelryProduction.Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionsController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        public CollectionsController(JewelryProductionContext context)
        {
            _context = context;
        }

        // GET: api/Collections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Collection>>> GetCollections()
        {
            return await _context.Collections.ToListAsync();
        }

        // GET: api/Collections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Collection>> GetCollection(string id)
        {
            var collection = await _context.Collections.FindAsync(id);

            if (collection == null)
            {
                return NotFound();
            }

            return collection;
        }

        // PUT: api/Collections/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCollection(string id, CollectionDTO collectionDTO)
        {
            if (id != collectionDTO.CollectionId)
            {
                return BadRequest();
            }

            var updateCollection = await _context.Collections.FindAsync(id);
            updateCollection.CollectionName = collectionDTO.CollectionName;
            updateCollection.Description = collectionDTO.Description;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CollectionExists(id))
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

        // POST: api/Collections
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Collection>> PostCollection(CollectionDTO collectionDTO)
        {
            var collection = new Collection
            {
                CollectionId = collectionDTO.CollectionId,
                CollectionName = collectionDTO.CollectionName,
                Description = collectionDTO.Description,
            };
            _context.Collections.Add(collection);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CollectionExists(collection.CollectionId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCollection", new { id = collection.CollectionId }, collection);
        }

        // DELETE: api/Collections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollection(string id)
        {
            var collection = await _context.Collections.FindAsync(id);
            if (collection == null)
            {
                return NotFound();
            }

            _context.Collections.Remove(collection);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CollectionExists(string id)
        {
            return _context.Collections.Any(e => e.CollectionId == id);
        }
    }
}
