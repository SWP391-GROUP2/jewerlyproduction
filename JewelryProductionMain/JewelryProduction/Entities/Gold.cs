namespace JewelryProduction;

public partial class Gold
{
    internal object ProductSample;

    public string GoldId { get; set; } = null!;

    public string GoldType { get; set; } = null!;

    public double Weight { get; set; }

    public decimal PricePerGram { get; set; }

    public ICollection<CustomerRequest> CustomerRequests { get; set; } = new List<CustomerRequest>();

    public ICollection<ProductSample> ProductSamples { get; set; } = new List<ProductSample>();
}
