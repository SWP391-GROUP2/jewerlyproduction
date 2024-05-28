namespace JewelryProduction.API.Model.UserModel
{
    public class RequestCreateUserModel
    {
        public string? _id { get; set; }
        public string? _name { get; set; }
        public string? _dateOfBirth { get; set; }
        public string? _phoneNumber { get; set; }
        public string? _email { get; set; }
        public string? _password { get; set; }
        public int? _roleID { get; set; }
    }
}
}
