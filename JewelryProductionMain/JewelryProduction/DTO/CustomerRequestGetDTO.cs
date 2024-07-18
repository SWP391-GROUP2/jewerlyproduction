namespace JewelryProduction.DTO
{
    public class CustomerRequestGetDTO
    {
        public string CustomizeRequestId { get; set; } = null!;
        public string CustomerId { get; set; } = null!;
        public string? CustomerName { get; set; }
        public string? SaleStaffId { get; set; }
        public string? SaleStaffName { get; set; } = null!;
        public string? ManagerId { get; set; }
        public string? ManagerName { get; set; } = null!;
        public string Type { get; set; } = null!;
        public string Style { get; set; } = null!;
        public double? Size { get; set; }
        public string GoldType { get; set; } = null!;
        public string GoldId { get; set; } = null!;
        public double? GoldWeight { get; set; }
        public ICollection<Gemstone> Gemstones { get; set; } = new List<Gemstone>();
        public decimal? quotation { get; set; }
        public string? quotationDes { get; set; }

        public decimal Quantity { get; set; }
        public string Status { get; set; } = null!;
    }
}
