using System;
using System.Collections.Generic;

namespace JewelryProduction.Core;

public partial class PaymentMethod
{
    public string PaymentMethodId { get; set; } = null!;

    public string PaymentMethodName { get; set; } = null!;

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
