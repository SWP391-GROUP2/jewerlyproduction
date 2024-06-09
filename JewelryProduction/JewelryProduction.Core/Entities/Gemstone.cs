namespace JewelryProduction;

public partial class Gemstone
{
    public string GemstoneId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Color { get; set; } = null!;

    public double CaratWeight { get; set; }

    public string Cut { get; set; } = null!;

    public string Clarity { get; set; } = null!;

    public decimal PricePerCarat { get; set; }

    public string ProductSampleId { get; set; } = null!;

    public string CustomizeRequestId { get; set; } = null!;

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();

    public virtual CustomerRequest CustomizeRequestIdNavigation { get; set; } = null!;

    public virtual ProductSample ProductSample { get; set; } = null!;
}
