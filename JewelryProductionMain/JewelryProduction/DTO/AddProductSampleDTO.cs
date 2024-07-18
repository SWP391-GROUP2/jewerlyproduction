namespace JewelryProduction.DTO
{
    public class AddProductSampleDTO
    {
        public string ProductSampleId { get; set; } = GenerateSampleId();

        public string ProductName { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Type { get; set; } = null!;

        public string Style { get; set; } = null!;

        public double? Size { get; set; }

        public decimal Price { get; set; }

        public string GoldId { get; set; } = null!;

        public double? GoldWeight { get; set; }

        private static string GenerateSampleId()
        {
            Random random = new Random();
            int randomNumber = random.Next(10000, 99999);
            return $"GS{randomNumber}";
        }
    }
}
