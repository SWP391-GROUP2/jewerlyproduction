namespace JewelryProduction.Core.DTO
{
    public class _3ddesign
    {
        public string _3dDesignId { get; set; } = null!;

        public string DesignName { get; set; } = null!;

        public byte[] Description { get; set; } = null!;

        public string? CustomizeRequestId { get; set; }

        public string? ProductSampleId { get; set; }

        public string DesignStaffId { get; set; } = null!;
    }
}
