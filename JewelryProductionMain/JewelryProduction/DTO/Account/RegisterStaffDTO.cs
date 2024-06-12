using System.ComponentModel.DataAnnotations;

namespace JewelryProduction.DTO.Account
{
    public class RegisterStaffDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Role { get; set; }
    }
}   
