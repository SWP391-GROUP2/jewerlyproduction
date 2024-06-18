namespace JewelryProduction.DTO
{
    public class GemstoneDTO
    {
        public string GemstoneId { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string Color { get; set; } = null!;
        public string? Shape { get; set; }
        public double? Size { get; set; }

        public double CaratWeight { get; set; }

        public string Cut { get; set; } = null!;

        public string Clarity { get; set; } = null!;

        public decimal Price { get; set; }

        public string ProductSampleId { get; set; } = null!;

        public string CustomizeRequestId { get; set; } = null!;
    }
}
