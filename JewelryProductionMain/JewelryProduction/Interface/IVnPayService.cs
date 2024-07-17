using JewelryProduction.Entities;

namespace JewelryProduction.Interface
{
    public interface IVnPayService
    {
        public Task<string> CreatePaymentUrl(HttpContext context, double price, string orderID);
        Task<VnPaymentResponseModel> PaymentExecute(IQueryCollection collection);
        //VnPaymentResponseModel PaymentExecuteV2(IQueryCollection collection);
    }
}
