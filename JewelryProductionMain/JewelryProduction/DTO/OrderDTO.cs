namespace JewelryProduction.DTO

{
    public class OrderDTO
    {
        public string OrderId { get; set; } = null!;

        public string ProductionStaffId { get; set; } = null!;

        public DateTime OrderDate { get; set; }

        public double? DepositAmount { get; set; }

        public string Status { get; set; } = null!;

        public string? CustomizeRequestId { get; set; }

        public string PaymentMethodId { get; set; } = null!;

        public double TotalPrice { get; set; }
    }
}
