using System.Text.Json.Serialization;

namespace JewelryProduction;
using System.Text.Json.Serialization;
public partial class Gold
{

    public string GoldId { get; set; } = null!;

    public string GoldType { get; set; } = null!;
    public decimal PricePerGram { get; set; }

    [JsonIgnore]
    public ICollection<CustomerRequest> CustomerRequests { get; set; } = new List<CustomerRequest>();

    public ICollection<ProductSample> ProductSamples { get; set; } = new List<ProductSample>();
}
