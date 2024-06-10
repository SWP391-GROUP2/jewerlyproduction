using System;
using System.Collections.Generic;

namespace JewelryProduction.Core;

public partial class Insurance
{
    public string InsuranceId { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public string OrderId { get; set; } = null!;

    public Order Order { get; set; } = null!;
}
