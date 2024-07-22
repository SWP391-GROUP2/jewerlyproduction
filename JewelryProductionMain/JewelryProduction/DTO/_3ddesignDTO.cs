namespace JewelryProduction.DTO
{
    public class _3ddesignDTO
    {
        public string _3dDesignId { get; set; } = GenerateDesignId();

        public string DesignName { get; set; } = null!;

        public IFormFile Image { get; set; }

        public string? OrderId { get; set; }

        public string? ProductSampleId { get; set; }

        public string DesignStaffId { get; set; } = null!;

        private static string GenerateDesignId()
        {
            Random random = new Random();
            int randomNumber = random.Next(10000, 99999);
            return $"D3D{randomNumber}";
        }
    }
}
