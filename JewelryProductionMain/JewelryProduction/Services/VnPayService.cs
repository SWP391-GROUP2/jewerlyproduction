using JewelryProduction.DbContext;
using JewelryProduction.Entities;
using JewelryProduction.Interface;
using JewelryProduction.Repositories;

namespace JewelryProduction.Services
{
    public class VnPayService : IVnPayService
    {
        private readonly IConfiguration _config;
        private readonly JewelryProductionContext _context;
        private readonly IOrderRepository _orderRepository;
        private readonly ILogger<VnPayService> _logger;
        public VnPayService(IConfiguration config, JewelryProductionContext context, IOrderRepository orderRepository, ILogger<VnPayService> logger)
        {
            _config = config; _context = context; _orderRepository = orderRepository; _logger = logger;
        }
        public async Task<string> CreatePaymentUrl(HttpContext context, double price, string orderID)
        {
            var tick = DateTime.Now.Ticks.ToString();

            var vnpay = new VnPayLibrary();
            vnpay.AddRequestData("vnp_Version", _config["VnPay:Version"]);
            vnpay.AddRequestData("vnp_Command", _config["VnPay:Command"]);
            vnpay.AddRequestData("vnp_TmnCode", _config["VnPay:TmnCode"]);
            vnpay.AddRequestData("vnp_Amount", (price * 100).ToString()); //số tiền thanh toán. số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. để gửi số tiền thanh toán là 100,000 vnd (một trăm nghìn vnđ) thì merchant cần nhân thêm 100 lần(khử phần thập phân), sau đó gửi sang vnpay là: 10000000
            vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", _config["VnPay:CurrCode"]);
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(context));
            vnpay.AddRequestData("vnp_Locale", _config["VnPay:Locale"]);
            vnpay.AddRequestData("vnp_OrderInfo", orderID);
            vnpay.AddRequestData("vnp_OrderType", "order"); //default value: other
            vnpay.AddRequestData("vnp_ReturnUrl", _config["VnPay:PaymentBackReturnUrl"]);
            vnpay.AddRequestData("vnp_TxnRef", tick); // Mã tham chiếu của giao dịch tại hệ thống của merchant.Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY.Không được trùng lặp trong ngày
            var paymentUrl = vnpay.CreateRequestUrl(_config["VnPay:BaseUrl"], _config["VnPay:HashSecret"]);
            _logger.LogInformation("Generated Payment URL: {PaymentUrl}", paymentUrl);

            return paymentUrl;
        }

        public VnPaymentResponseModel PaymentExecute(IQueryCollection collection) // chi moi tinh deposit amount.
        {
            var vnPay = new VnPayLibrary();

            foreach (var (key, value) in collection)
            {
                if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    vnPay.AddResponseData(key, value.ToString());
                }
            }

            var vnp_orderId = vnPay.GetResponseData("vnp_TxnRef");
            var vnp_TransactionId = vnPay.GetResponseData("vnp_TransactionNo");
            var vnp_SecureHash =
                collection.FirstOrDefault(k => k.Key == "vnp_SecureHash").Value; //hash của dữ liệu trả về
            var vnp_ResponseCode = vnPay.GetResponseData("vnp_ResponseCode");
            var vnp_OrderInfo = vnPay.GetResponseData("vnp_OrderInfo");

            var checkSignature =
                vnPay.ValidateSignature(vnp_SecureHash, _config["VnPay:HashSecret"]); //check Signature

            if (!checkSignature)
                return new VnPaymentResponseModel()
                {
                    Success = false
                };

            //luu vao database
            var order = _orderRepository.GetOrderOnly(vnp_OrderInfo);
            order.DepositAmount = Decimal.Parse(vnPay.GetResponseData("vnp_Amount"));
            order.Status = "Assigning Designer";
            _context.SaveChangesAsync();

            return new VnPaymentResponseModel()
            {
                Success = true,
                PaymentMethod = "vnPay",
                OrderDescription = vnp_OrderInfo,
                OrderId = vnp_orderId.ToString(),
                TransactionId = vnp_TransactionId.ToString(),
                Token = vnp_SecureHash,
                VnPayResponseCode = vnp_ResponseCode
            };
        }

        public VnPaymentResponseModel PaymentExecuteV2(IQueryCollection collection) // chi moi tinh deposit amount.
        {
            var vnPay = new VnPayLibrary();

            foreach (var (key, value) in collection)
            {
                if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    vnPay.AddResponseData(key, value.ToString());
                }
            }

            var vnp_orderId = vnPay.GetResponseData("vnp_TxnRef");
            var vnp_TransactionId = vnPay.GetResponseData("vnp_TransactionNo");
            var vnp_SecureHash =
                collection.FirstOrDefault(k => k.Key == "vnp_SecureHash").Value; //hash của dữ liệu trả về
            var vnp_ResponseCode = vnPay.GetResponseData("vnp_ResponseCode");
            var vnp_OrderInfo = vnPay.GetResponseData("vnp_OrderInfo");

            var checkSignature =
                vnPay.ValidateSignature(vnp_SecureHash, _config["VnPay:HashSecret"]); //check Signature

            if (!checkSignature)
                return new VnPaymentResponseModel()
                {
                    Success = false
                };

            //luu vao database
            var order = _orderRepository.GetOrderOnly(vnp_OrderInfo);
            order.Status = "Shipping";
            _context.SaveChangesAsync();

            return new VnPaymentResponseModel()
            {
                Success = true,
                PaymentMethod = "vnPay",
                OrderDescription = vnp_OrderInfo,
                OrderId = vnp_orderId.ToString(),
                TransactionId = vnp_TransactionId.ToString(),
                Token = vnp_SecureHash,
                VnPayResponseCode = vnp_ResponseCode
            };
        }
    }
}
