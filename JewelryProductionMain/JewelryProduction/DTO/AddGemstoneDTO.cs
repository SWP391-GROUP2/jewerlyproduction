namespace JewelryProduction.DTO
{
    public class AddGemstoneDTO
    {
        public string GemstoneId { get; set; } = GenerateGemstoneId();

        public string Name { get; set; } = null!;

        public string? Shape { get; set; }

        public double? Size { get; set; }

        public string Color { get; set; } = null!;

        public double CaratWeight { get; set; }

        public string Cut { get; set; } = null!;

        public string Clarity { get; set; } = null!;

        public decimal Price { get; set; }

        public IFormFile Image { get; set; }

        public string? ProductSampleId { get; set; }

        public string? CustomizeRequestId { get; set; }

        public string? CategoryId { get; set; }

        private static string GenerateGemstoneId()
        {
            Random random = new Random();
            int randomNumber = random.Next(10000, 99999);
            return $"GS{randomNumber}";
        }
    }
}
