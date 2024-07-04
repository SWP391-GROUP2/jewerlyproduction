namespace JewelryProduction.DTO
{
    public class CustomerRequestGetDTO
    {
        public CustomerRequest? CustomerRequest { get; set; } = null!;
        public string CustomerName { get; set; }
        public string? SaleStaffName { get; set; } = null!;
        public string? ManagerName { get; set; } = null!;
        public string GoldType {  get; set; } = null!;
    }
}
