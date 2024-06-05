using JewelryProduction.Core.Entities;
using System;
using System.Collections.Generic;

namespace JewelryProduction;

public partial class User
{
    public string UserId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateOnly DateOfBirth { get; set; }

    public decimal PhoneNumber { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string RoleId { get; set; } = null!;

    public virtual ICollection<CustomerRequest> CustomerRequests { get; set; } = new List<CustomerRequest>();

    public virtual ICollection<Message> MessageCustomers { get; set; } = new List<Message>();

    public virtual ICollection<Message> MessageSaleStaffs { get; set; } = new List<Message>();

    public virtual ICollection<Order> OrderCustomers { get; set; } = new List<Order>();

    public virtual ICollection<Order> OrderManagers { get; set; } = new List<Order>();

    public virtual ICollection<Order> OrderProductionStaffs { get; set; } = new List<Order>();

    public virtual ICollection<Order> OrderSaleStaffs { get; set; } = new List<Order>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<_3ddesign> _3ddesigns { get; set; } = new List<_3ddesign>();
}
