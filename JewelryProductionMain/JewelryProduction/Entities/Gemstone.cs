using System;
using System.Collections.Generic;

namespace JewelryProduction;

public partial class Gemstone
{
    public string GemstoneId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Color { get; set; } = null!;

    public double CaratWeight { get; set; }

    public string Cut { get; set; } = null!;

    public string Clarity { get; set; } = null!;

    public decimal PricePerCarat { get; set; }

    public string? ProductSampleId { get; set; }

    public string? CustomizeRequestId { get; set; }

    public string? CategoryId { get; set; }

    public Category? Category { get; set; }

    public CustomerRequest? CustomizeRequestDNavigation { get; set; }

    public ProductSample? ProductSample { get; set; }
}
