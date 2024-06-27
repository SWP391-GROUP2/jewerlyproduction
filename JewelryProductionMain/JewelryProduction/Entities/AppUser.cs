using JewelryProduction.Entities;
using Microsoft.AspNetCore.Identity;

namespace JewelryProduction;

public partial class AppUser : IdentityUser
{
    public string Name { get; set; } = null!;
    public DateOnly? DateOfBirth { get; set; } = null!;
    public string? Avatar { get; set; } = null!;

    public ICollection<CustomerRequest> CustomerRequests { get; set; } = new List<CustomerRequest>();
    public ICollection<CustomerRequest> SaleStaffRequests { get; set; } = new List<CustomerRequest>();
    public ICollection<CustomerRequest> ManagerRequests { get; set; } = new List<CustomerRequest>();

    public ICollection<Message> MessageCustomers { get; set; } = new List<Message>();

    public ICollection<Message> MessageSaleStaffs { get; set; } = new List<Message>();

    public ICollection<Order> OrderProductionStaffs { get; set; } = new List<Order>();

    public ICollection<_3ddesign> _3ddesigns { get; set; } = new List<_3ddesign>();
    public ICollection<Notification> SentNotifications { get; set; } = new List<Notification>();
    public ICollection<Notification> ReceivedNotifications { get; set; } = new List<Notification>();
}
