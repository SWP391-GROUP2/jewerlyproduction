namespace JewelryProduction;

public partial class Gold
{
    public string GoldId { get; set; } = null!;

    public string GoldType { get; set; } = null!;

    public double Weight { get; set; }

    public decimal PricePerGram { get; set; }

    public virtual CustomerRequestDTO? CustomerRequest { get; set; }

    public virtual ProductSample? ProductSample { get; set; }
}
