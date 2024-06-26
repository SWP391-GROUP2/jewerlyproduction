using System.ComponentModel.DataAnnotations;

namespace JewelryProduction.DTO.Account
{
    public class SetPasswordDTO
    {
        public string CurrentPassword { get; set;}
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
