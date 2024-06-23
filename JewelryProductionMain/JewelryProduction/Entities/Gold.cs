using System.Text.Json.Serialization;

namespace JewelryProduction;

public partial class Gold
{

    public string GoldId { get; set; } = null!;

    public string GoldType { get; set; } = null!;

    public double Weight { get; set; }

    public decimal PricePerGram { get; set; }

    [JsonIgnore]
    public ICollection<CustomerRequest> CustomerRequests { get; set; } = new List<CustomerRequest>();

    public ICollection<ProductSample> ProductSamples { get; set; } = new List<ProductSample>();
}
