namespace JewelryProduction.DTO
{
    public class OrderStatDTO
    {
        public int TotalOrders { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TotalMaterialPrice { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal AverageOrderValue { get; set; }
        public Dictionary<string, Dictionary<string, int>> OrderDistribution { get; set; }
    }
}
