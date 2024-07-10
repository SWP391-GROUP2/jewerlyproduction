namespace JewelryProduction.DTO
{
    public class UserWithRoleDTO
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public IList<string> Roles { get; set; }
    }
}
