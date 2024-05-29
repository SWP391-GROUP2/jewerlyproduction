namespace JewelryProduction.API.Model.LoginModel
{
    public class RegisterRequest
    {
        public string name { get; set; }
        public DateTime _dateOfBirth { get; set; }
        public string _phoneNumber { get; set; }
        public string _email { get; set; }
        public string _password { get; set; }
        public string _confirmPassword { get; set; }
        public bool EmailConfirmed { get; set; } 
    }
}
