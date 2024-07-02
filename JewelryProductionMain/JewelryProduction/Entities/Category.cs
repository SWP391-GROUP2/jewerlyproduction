    using System;
using System.Collections.Generic;

namespace JewelryProduction;

public partial class Category
{
    public string CategoryId { get; set; } = null!;

    public string CategoryName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public ICollection<Gemstone> Gemstones { get; set; } = new List<Gemstone>();
}
