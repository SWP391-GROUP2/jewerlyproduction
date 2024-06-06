namespace JewelryProduction.Core.DTO
{
    public class StaffRegisterDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Name { get; set; }
        public required string PhoneNumber { get; set; }
        public required string RoleId { get; set; }
    }
}
