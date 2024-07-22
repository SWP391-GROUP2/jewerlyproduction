namespace JewelryProduction.DTO.Account
{
    public class NewUserDTO
    {
        public bool isPasswordSet { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public bool EmailVerify { get; set; }
    }
}
