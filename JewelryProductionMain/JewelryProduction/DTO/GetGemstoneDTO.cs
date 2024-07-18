namespace JewelryProduction.DTO
{
    public class GetGemstoneDTO
    {
        public string GemstoneId { get; set; }

        public string Name { get; set; } = null!;

        public string? Shape { get; set; }

        public double? Size { get; set; }

        public string Color { get; set; } = null!;

        public double CaratWeight { get; set; }

        public string Cut { get; set; } = null!;

        public string Clarity { get; set; } = null!;

        public decimal Price { get; set; }

        public string Image { get; set; }

        public string? ProductSampleId { get; set; }

        public string? CustomizeRequestId { get; set; }

        public string? CategoryId { get; set; }
        
        public string? CategoryName { get; set; }
    }
}
