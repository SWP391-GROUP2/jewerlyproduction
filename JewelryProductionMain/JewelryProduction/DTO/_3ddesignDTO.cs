namespace JewelryProduction.DTO
{
    public class _3ddesignDTO
    {
        public string _3dDesignId { get; set; } = Guid.NewGuid().ToString();

        public string DesignName { get; set; } = null!;

        public IFormFile Image { get; set; }

        public string? CustomizeRequestId { get; set; }

        public string? ProductSampleId { get; set; }

        public string DesignStaffId { get; set; } = null!;
    }
}
