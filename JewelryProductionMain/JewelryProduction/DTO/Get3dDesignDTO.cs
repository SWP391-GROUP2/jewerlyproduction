namespace JewelryProduction.DTO
{
    public class Get3dDesignDTO
    {
        public string _3dDesignId { get; set; }

        public string DesignName { get; set; } = null!;

        public string Image { get; set; }

        public string? CustomizeRequestId { get; set; }

        public string? ProductSampleId { get; set; }

        public string DesignStaffId { get; set; } = null!;
    }
}
