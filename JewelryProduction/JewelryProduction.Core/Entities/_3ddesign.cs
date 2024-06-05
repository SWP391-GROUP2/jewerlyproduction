namespace JewelryProduction;

public partial class _3ddesign
{
    public string _3dDesignId { get; set; } = null!;

    public string DesignName { get; set; } = null!;

    public byte[] Description { get; set; } = null!;

    public string? CustomizeRequestId { get; set; }

    public string? ProductSampleId { get; set; }

    public string DesignStaffId { get; set; } = null!;

    public virtual CustomerRequestDTO? CustomizeRequest { get; set; }

    public virtual User DesignStaff { get; set; } = null!;

    public virtual ProductSample? ProductSample { get; set; }
}
