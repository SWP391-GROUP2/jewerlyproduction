using System;
using System.Collections.Generic;

namespace JewelryProduction.Core;

public partial class Collection
{
    public string CollectionId { get; set; } = null!;

    public string CollectionName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public ICollection<ProductSample> ProductSamples { get; set; } = new List<ProductSample>();
}
