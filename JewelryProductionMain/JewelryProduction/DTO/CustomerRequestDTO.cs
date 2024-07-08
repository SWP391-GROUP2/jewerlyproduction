namespace JewelryProduction.DTO
{
    public class CustomerRequestDTO
    {
        public string CustomerId { get; set; } = null!;
        public string? SaleStaffId { get; set; }
        public string? ManagerId { get; set; }
        public string Type { get; set; } = null!;

        public string Style { get; set; } = null!;

        public double? Size { get; set; }

        public decimal Quantity { get; set; }
        public string GoldType { get; set; } = null!;
        public double? quotation { get; set; }
        public string? quotationDes { get; set; }
        public List<string> PrimaryGemstoneId { get; set; } = new List<string>();
        public List<string> AdditionalGemstone { get; set; } = new List<string>();
    }
}
