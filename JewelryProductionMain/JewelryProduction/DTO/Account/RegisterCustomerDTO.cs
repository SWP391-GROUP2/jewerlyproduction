using System.ComponentModel.DataAnnotations;

namespace JewelryProduction.DTO.Account
{
    public class RegisterCustomerDTO
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; } = null!;
        [Required]
        public string? Password { get; set; } = null!;
        [Required]
        public string? Name { get; set; } = null!;
        [Required]
        public string? PhoneNumber { get; set; } = null!;
    }
}
