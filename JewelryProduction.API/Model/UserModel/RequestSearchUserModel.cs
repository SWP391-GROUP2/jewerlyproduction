namespace JewelryProduction.API.Model.UserModel
{
    public class RequestSearchUserModel
    {
        public string? _id { get; set; }
        public string? _name { get; set; }
        public string? _dateOfBirth { get; set; }
        public string? _phoneNumber { get; set; }
        public string? _email { get; set; }
        public string? _password { get; set; }
        public int? _roleID { get; set; }
        public SortContent? SortContent { get; set; }
    }
    public class SortContent
    {
        public SortUserByEnum sortUserBy { get; set; }
        public SortUserTypeEnum sortUserType { get; set; }
    }
    public enum SortUserByEnum
    {
        _id = 1,
        _name = 2,
        _dateOfBirth = 3,
        _phoneNumber = 4,
        _email = 5,
        _roleID = 6,
    }
    public enum SortUserTypeEnum
    {
        Ascending = 1,
        Descending = 2,
    }
}

}
