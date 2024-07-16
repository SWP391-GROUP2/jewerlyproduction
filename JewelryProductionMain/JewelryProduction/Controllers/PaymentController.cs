using JewelryProduction.Interface;
using Microsoft.AspNetCore.Mvc;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : Controller
    {
        private readonly IVnPayService _vnPayService;

        public PaymentController(IVnPayService vnPayService)
        {
            _vnPayService = vnPayService;
        }


        [HttpPost("CreatePaymentUrl")]
        public async Task<IActionResult> CreatePaymentUrl(double price, string orderID)
        {
            var url = await _vnPayService.CreatePaymentUrl(HttpContext, price, orderID);

            return Ok(url);
        }

        [HttpGet("Check")]
        public IActionResult PaymentCallback()
        {

            var response = _vnPayService.PaymentExecute(Request.Query);

            return Json(response);
        }
    }
}
