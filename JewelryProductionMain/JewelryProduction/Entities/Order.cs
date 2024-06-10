using System;
using System.Collections.Generic;

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

    public AppUser Customer { get; set; } = null!;

    public CustomerRequest? CustomizeRequest { get; set; }

    public Insurance? Insurance { get; set; }

    public AppUser Manager { get; set; } = null!;

    public PaymentMethod PaymentMethod { get; set; } = null!;

    public ProductSample? ProductSample { get; set; }

    public AppUser ProductionStaff { get; set; } = null!;

    public AppUser SaleStaff { get; set; } = null!;
}
