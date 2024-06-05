namespace JewelryProduction;

public partial class Order
{
    public string OrderId { get; set; } = null!;

    public string CustomerId { get; set; } = null!;

    public string SaleStaffId { get; set; } = null!;

    public string ManagerId { get; set; } = null!;

    public string ProductionStaffId { get; set; } = null!;

    public DateTime OrderDate { get; set; }

    public decimal? DepositAmount { get; set; }

    public string Status { get; set; } = null!;

    public string? ProductSampleId { get; set; }

    public string? CustomizeRequestId { get; set; }

    public string PaymentMethodId { get; set; } = null!;

    public decimal TotalPrice { get; set; }

    public virtual User Customer { get; set; } = null!;

    public virtual CustomerRequestDTO? CustomizeRequest { get; set; }

    public virtual Insurance? Insurance { get; set; }

    public virtual User Manager { get; set; } = null!;

    public virtual PaymentMethod PaymentMethod { get; set; } = null!;

    public virtual ProductSample? ProductSample { get; set; }

    public virtual User ProductionStaff { get; set; } = null!;

    public virtual User SaleStaff { get; set; } = null!;
}
