namespace JewelryProduction.DTO
{
    public class GetAllOrdersDTO
    {
        public string OrderId { get; set; } = null!;
        public DateTime OrderDate { get; set; }
        public string CustomerName { get; set; } = null!;
        public string ManagerName { get; set; } = null!;
        public string SaleStaffName { get; set; } = null!;
        public string GoldType { get; set; } = null!;
        public double GoldWeight { get; set; }
        public string? ProductionStaffName { get; set; }
        public string? DesignStaffName { get; set; }
        public string? PaymentMethodName { get; set; }
        public string? Address { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
