namespace JewelryProduction.Core.DTO
{
    public class CustomerRegisterDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Name { get; set; }
        public required string PhoneNumber { get; set; }
    }
}
