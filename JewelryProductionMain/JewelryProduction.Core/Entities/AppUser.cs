using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;

namespace JewelryProduction.Core;

public partial class AppUser : IdentityUser
{
    public string Name { get; set; } = null!;

    public DateOnly DateOfBirth { get; set; }

    public ICollection<CustomerRequest> CustomerRequests { get; set; } = new List<CustomerRequest>();

    public ICollection<Message> MessageCustomers { get; set; } = new List<Message>();

    public ICollection<Message> MessageSaleStaffs { get; set; } = new List<Message>();

    public ICollection<Order> OrderCustomers { get; set; } = new List<Order>();

    public ICollection<Order> OrderManagers { get; set; } = new List<Order>();

    public ICollection<Order> OrderProductionStaffs { get; set; } = new List<Order>();

    public virtual ICollection<Order> OrderSaleStaffs { get; set; } = new List<Order>();

    public ICollection<_3ddesign> _3ddesigns { get; set; } = new List<_3ddesign>();
}
