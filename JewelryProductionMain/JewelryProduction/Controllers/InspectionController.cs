using JewelryProduction.Entities;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InspectionController : ControllerBase
    {
        private readonly IInspectionService _service;

        public InspectionController(IInspectionService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInspectionById(string id)
        {
            var inspection = await _service.GetInspectionById(id);
            if (inspection == null)
            {
                return NotFound();
            }
            return Ok(inspection);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllInspections()
        {
            var inspections = await _service.GetAllInspections();
            return Ok(inspections);
        }

        [HttpPost]
        public async Task<IActionResult> AddInspection([FromBody] Inspection inspection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _service.AddInspection(inspection);
            return CreatedAtAction(nameof(GetInspectionById), new { id = inspection.InspectionId }, inspection);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInspection(string id, [FromBody] Inspection inspection)
        {
            if (id != inspection.InspectionId || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await _service.UpdateInspection(inspection);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInspection(string id)
        {
            await _service.DeleteInspection(id);
            return NoContent();
        }
        [HttpGet("order/{orderId}")]
        public async Task<IActionResult> GetInspectionsByOrderId(string orderId)
        {
            var inspections = await _service.GetInspectionsByOrderId(orderId);
            return Ok(inspections);
        }
    }
}
