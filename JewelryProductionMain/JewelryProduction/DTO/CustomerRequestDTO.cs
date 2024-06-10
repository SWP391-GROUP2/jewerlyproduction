namespace JewelryProduction.DTO
{
    public class CustomerRequestDTO
    {
        public string CustomizeRequestId { get; set; } = null!;

        public string GoldId { get; set; } = null!;

        public string CustomerId { get; set; } = null!;

        public string Type { get; set; } = null!;

        public string Style { get; set; } = null!;

        public double? Size { get; set; }

        public decimal Quantity { get; set; }
    }
}
