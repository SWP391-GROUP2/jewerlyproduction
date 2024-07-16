using JewelryProduction.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceController : ControllerBase
    {
        private readonly IInsuranceService _insuranceService;

        public InsuranceController(IInsuranceService insuranceService)
        {
            _insuranceService = insuranceService;
        }

        [HttpPost("create/{orderId}")]
        public async Task<IActionResult> CreateInsurance(string orderId)
        {
            try
            {
                var insurance = await _insuranceService.CreateInsurance(orderId);
                return Ok(insurance);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllInsurances()
        {
            var insurances = await _insuranceService.GetAllInsurancesAsync();
            return Ok(insurances);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInsuranceById(string id)
        {
            var insurance = await _insuranceService.GetInsuranceByIdAsync(id);
            if (insurance == null)
            {
                return NotFound();
            }
            return Ok(insurance);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInsurance(string id, [FromBody] Insurance insurance)
        {
            if (id != insurance.InsuranceId)
            {
                return BadRequest();
            }

            var updatedInsurance = await _insuranceService.UpdateInsuranceAsync(insurance);
            return Ok(updatedInsurance);
        }

    }
}
