namespace JewelryProduction;

public partial class CustomerRequest
{
    public string CustomizeRequestId { get; set; } = null!;

    public string GoldId { get; set; } = null!;

    public string CustomerId { get; set; } = null!;
    public string SaleStaffId { get; set; } = null!;
    public string ManagerId { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Style { get; set; } = null!;

    public double? Size { get; set; }

    public double? quotation { get; set; } = null!;
    public string quotationDes { get; set; } = null!;

    public decimal Quantity { get; set; }
    public string Status { get; set; } = null!;

    public AppUser Customer { get; set; } = null!;
    public AppUser SaleStaff { get; set; } = null!;
    public AppUser Manager { get; set; } = null!;

    public ICollection<Gemstone> Gemstones { get; set; } = new List<Gemstone>();

    public Gold Gold { get; set; } = null!;

    public Order? Order { get; set; }

    public ICollection<_3ddesign> _3ddesigns { get; set; } = new List<_3ddesign>();
}
