namespace JewelryProduction;

public partial class CustomerRequest
{
    public string CustomizeRequestId { get; set; } = null!;

    public string GoldId { get; set; } = null!;

    public string CustomerId { get; set; } = null!;
    public string? SaleStaffId { get; set; }
    public string? ManagerId { get; set; }

    public string Type { get; set; } = null!;

    public string Style { get; set; } = null!;

    public double? Size { get; set; }

    public decimal? quotation { get; set; }
    public string? quotationDes { get; set; }

    public decimal Quantity { get; set; }
    public string Status { get; set; } = null!;

    public AppUser Customer { get; set; } = null!;
    public AppUser SaleStaff { get; set; } 
    public AppUser Manager { get; set; } 

    public ICollection<Gemstone> Gemstones { get; set; } = new List<Gemstone>();

    public Gold Gold { get; set; } = null!;

    public Order? Order { get; set; }

    public ICollection<_3ddesign> _3ddesigns { get; set; } = new List<_3ddesign>();
}
