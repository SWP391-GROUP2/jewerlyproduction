namespace JewelryProduction.DTO
{
    public class GoldDTO
    {
        public string GoldId { get; set; } = null!;

        public string GoldType { get; set; } = null!;

        public double Weight { get; set; }

        public decimal PricePerGram { get; set; }
    }
}
