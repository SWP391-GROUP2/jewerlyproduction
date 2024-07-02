namespace JewelryProduction.DTO
{
    public class AddGemstoneDTO
    {
        public string GemstoneId { get; set; }
        public string Name { get; set; } = null!;

        public string Color { get; set; } = null!;
        public string? Shape { get; set; }
        public double? Size { get; set; }

        public double CaratWeight { get; set; }

        public string Cut { get; set; } = null!;

        public string Clarity { get; set; } = null!;

        public decimal Price { get; set; }
    }
}
