using System;
using System.Collections.Generic;

namespace JewelryProduction.Core;

public partial class _3ddesign
{
    public string _3dDesignId { get; set; } = null!;

    public string DesignName { get; set; } = null!;

    public byte[] Description { get; set; } = null!;

    public string? CustomizeRequestId { get; set; }

    public string? ProductSampleId { get; set; }

    public string DesignStaffId { get; set; } = null!;

    public CustomerRequest? CustomizeRequest { get; set; }

    public AppUser DesignStaff { get; set; } = null!;

    public ProductSample? ProductSample { get; set; }
}
