using System.Text.Json.Serialization;

namespace JewelryProduction.DTO.Account
{
    public class UpdateUserProfileDTO
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        public string? DateOfBirth { get; set; }

        public IFormFile? Avatar { get; set; }
    }
}
