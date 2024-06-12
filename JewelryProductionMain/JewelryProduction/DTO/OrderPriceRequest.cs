namespace JewelryProduction.DTO
{
    public class OrderPriceRequest
    {
        public OrderDTO Order { get; set; }
        public GoldDTO Gold { get; set; }
        public GemstoneDTO Gemstone { get; set; }
    }
}
