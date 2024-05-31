using System;
using System.Collections.Generic;

namespace JewelryProduction;

public partial class Category
{
    public string CategoryId { get; set; } = null!;

    public string CategoryName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string GemstoneId { get; set; } = null!;

    public virtual Gemstone Gemstone { get; set; } = null!;
}
