namespace JewelryProduction.DTO
{
    public class OrderComparisonDTO
    {
        public int CurrentYear { get; set; }
        public decimal CurrentYearTotalPrice { get; set; }
        public int CurrentYearOrderCount { get; set; }
        public List<OrderYearComparisonDTO> Comparisons { get; set; }
    }
}
