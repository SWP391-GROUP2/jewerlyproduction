namespace JewelryProduction.DTO.BasicDTO
{
    public class AppUserDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public string? Avatar { get; set; }
    }
}
