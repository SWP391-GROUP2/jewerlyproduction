namespace JewelryProduction.Core.DTO
{
    public class OrderDTO
    {
        public string OrderId { get; set; } = null!;

        public string CustomerId { get; set; } = null!;

        public string SaleStaffId { get; set; } = null!;

        public string ManagerId { get; set; } = null!;

        public string ProductionStaffId { get; set; } = null!;

        public DateTime OrderDate { get; set; }

        public decimal? DepositAmount { get; set; }

        public string Status { get; set; } = null!;

        public string? ProductSampleId { get; set; }

        public string? CustomizeRequestId { get; set; }

        public string PaymentMethodId { get; set; } = null!;

        public decimal TotalPrice { get; set; }
    }
}
