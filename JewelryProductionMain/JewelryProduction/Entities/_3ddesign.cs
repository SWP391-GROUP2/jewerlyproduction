using System;
using System.Collections.Generic;

namespace JewelryProduction;

public partial class _3ddesign
{
    public string _3dDesignId { get; set; } = null!;

    public string DesignName { get; set; } = null!;

    public string Image { get; set; } = null!;

    public string? OrderId { get; set; }

    public string? ProductSampleId { get; set; }

    public string DesignStaffId { get; set; } = null!;

    public Order? Order { get; set; }

    public AppUser DesignStaff { get; set; } = null!;

    public ProductSample? ProductSample { get; set; }
}
