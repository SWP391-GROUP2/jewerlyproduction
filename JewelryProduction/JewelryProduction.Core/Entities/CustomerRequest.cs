namespace JewelryProduction;

public partial class CustomerRequestDTO
{
    public string CustomizeRequestId { get; set; } = null!;

    public string GoldId { get; set; } = null!;

    public string CustomerId { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Style { get; set; } = null!;

    public double? Size { get; set; }

    public decimal Quantity { get; set; }

    public virtual User Customer { get; set; } = null!;

    public virtual ICollection<Gemstone> Gemstones { get; set; } = new List<Gemstone>();

    public virtual Gold Gold { get; set; } = null!;

    public virtual Order? Order { get; set; }

    public virtual ICollection<_3ddesign> _3ddesigns { get; set; } = new List<_3ddesign>();
}
