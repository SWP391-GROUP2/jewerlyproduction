using JewelryProduction.Entities;

namespace JewelryProduction.Interface
{
    public interface IVnPayService
    {
        Task<string> CreatePaymentUrl(HttpContext context, VnPaymentRequestModel model);
        VnPaymentResponseModel PaymentExecute(IQueryCollection collection);
    }
}
