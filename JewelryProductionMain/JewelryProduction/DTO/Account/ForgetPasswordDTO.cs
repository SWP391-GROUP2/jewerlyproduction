namespace JewelryProduction.DTO.Account
{
    public class ForgetPasswordDTO
    {
        public string email { get; set; }
        public string resetToken { get; set;}
        public string password { get; set; }
        public string confirmPassword { get; set; }
    }
}
