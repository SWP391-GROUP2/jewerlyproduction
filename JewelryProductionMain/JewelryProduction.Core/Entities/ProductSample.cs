using System;
using System.Collections.Generic;

namespace JewelryProduction.Core;

public partial class ProductSample
{
    public string ProductSampleId { get; set; } = null!;

    public string ProductName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Style { get; set; } = null!;

    public double? Size { get; set; }

    public decimal Price { get; set; }

    public string GoldId { get; set; } = null!;

    public ICollection<Gemstone> Gemstones { get; set; } = new List<Gemstone>();

    public Gold Gold { get; set; } = null!;

    public ICollection<Order> Orders { get; set; } = new List<Order>();

    public ICollection<_3ddesign> _3ddesigns { get; set; } = new List<_3ddesign>();

    public ICollection<Collection> Collections { get; set; } = new List<Collection>();
}
