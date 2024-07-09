namespace JewelryProduction.DTO
{
    public class OrderYearComparisonDTO
    {
        public int Year { get; set; }
        public decimal TotalPrice { get; set; }
        public int NumberOfOrders { get; set; }
        public decimal TotalPriceDifference { get; set; }
        public int OrderCountDifference { get; set; }
    }
}
