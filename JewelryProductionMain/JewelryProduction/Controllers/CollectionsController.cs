using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionsController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private readonly ICollectionService _collectionService;

        public CollectionsController(JewelryProductionContext context, ICollectionService collectionService)
        {
            _context = context;
            _collectionService = collectionService;
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
        [HttpPost("add-samples-by-style")]
        public async Task<IActionResult> AddProductSamplesToCollectionByStyle(string collectionId, string style)
        {
            if (string.IsNullOrWhiteSpace(collectionId))
            {
                return BadRequest("Collection ID cannot be null or empty");
            }

            if (string.IsNullOrWhiteSpace(style))
            {
                return BadRequest("Style cannot be null or empty");
            }
            try
            {
                await _collectionService.AddProductSamplesToCollectionByStyleAsync(collectionId, style);
                return Ok("Product samples added successfully");
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("add-samples-by-ids")]
        public async Task<IActionResult> AddProductSamplesToCollection(AddProductSampleToCollectionDTO collectionDTO)
        {
            if (string.IsNullOrWhiteSpace(collectionDTO.collectionId))
            {
                return BadRequest("Collection ID cannot be null or empty");
            }
            try
            {
                await _collectionService.AddProductSamplesToCollectionAsync(collectionDTO);
                return Ok("Product samples added successfully");
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                return BadRequest(ex.Message);
            }
        }

        private bool CollectionExists(string id)
        {
            return _context.Collections.Any(e => e.CollectionId == id);
        }
    }
}
