using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface IVnPayService
    {
        public Task<string> CreatePaymentUrl(HttpContext context, double price, string orderID);
        VnPaymentResponseModel PaymentExecute(IQueryCollection collection);
    }
}
