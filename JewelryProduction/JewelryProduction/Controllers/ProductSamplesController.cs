﻿using JewelryProduction.Core;
using JewelryProduction.Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSamplesController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        public ProductSamplesController(JewelryProductionContext context)
        {
            _context = context;
        }

        // GET: api/ProductSamples
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductSample>>> GetProductSamples()
        {
            return await _context.ProductSamples.ToListAsync();
        }

        // GET: api/ProductSamples/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductSample>> GetProductSample(string id)
        {
            var productSample = await _context.ProductSamples.FindAsync(id);

            if (productSample == null)
            {
                return NotFound();
            }

            return productSample;
        }

        // PUT: api/ProductSamples/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductSample(string id, ProductSampleDTO productSampleDTO)
        {
            if (id != productSampleDTO.ProductSampleId)
            {
                return BadRequest();
            }
            var updateProduct = await _context.ProductSamples.FindAsync(id);
            updateProduct.ProductName = productSampleDTO.ProductName;
            updateProduct.Type = productSampleDTO.Type;
            updateProduct.Style = productSampleDTO.Style;
            updateProduct.Size = productSampleDTO.Size;
            updateProduct.Price = productSampleDTO.Price;
            updateProduct.GoldId = productSampleDTO.GoldId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductSampleExists(id))
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

        // POST: api/ProductSamples
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductSample>> PostProductSample(ProductSampleDTO productSampleDTO)
        {
            var productSample = new ProductSample
            {
                ProductSampleId = productSampleDTO.ProductSampleId,
                ProductName = productSampleDTO.ProductName,
                Type = productSampleDTO.Type,
                Style = productSampleDTO.Style,
                Size = productSampleDTO.Size,
                Price = productSampleDTO.Price,
                GoldId = productSampleDTO.GoldId,
            };
            _context.ProductSamples.Add(productSample);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductSampleExists(productSample.ProductSampleId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProductSample", new { id = productSample.ProductSampleId }, productSample);
        }

        // DELETE: api/ProductSamples/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductSample(string id)
        {
            var productSample = await _context.ProductSamples.FindAsync(id);
            if (productSample == null)
            {
                return NotFound();
            }

            _context.ProductSamples.Remove(productSample);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductSampleExists(string id)
        {
            return _context.ProductSamples.Any(e => e.ProductSampleId == id);
        }
    }
}