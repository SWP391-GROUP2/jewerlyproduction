using System;
using System.Collections.Generic;

namespace JewelryProduction.Core;

public partial class Gold
{
    public string GoldId { get; set; } = null!;

    public string GoldType { get; set; } = null!;

    public double Weight { get; set; }

    public decimal PricePerGram { get; set; }

    public ICollection<CustomerRequest> CustomerRequests { get; set; } = new List<CustomerRequest>();

    public ICollection<ProductSample> ProductSamples { get; set; } = new List<ProductSample>();
}
