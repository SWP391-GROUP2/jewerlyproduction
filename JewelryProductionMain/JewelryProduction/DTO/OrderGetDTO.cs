namespace JewelryProduction.DTO
{
    public class OrderGetDTO
    {
        public Order Order { get; set; }
        public string? ProductionStaffName { get; set; } = null!;
        public string? DesignStaffName { get; set; } = null!;
        public string PaymentMethodName { get; set; } = null!;
        public string Address { get; set; } = null;
    }
}
