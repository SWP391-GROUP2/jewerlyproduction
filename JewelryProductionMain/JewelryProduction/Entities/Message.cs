using System;
using System.Collections.Generic;

namespace JewelryProduction;

public partial class Message
{
    public string MessageId { get; set; } = null!;

    public string MessageText { get; set; } = null!;

    public DateTime Timestamp { get; set; }

    public string SaleStaffId { get; set; } = null!;

    public string CustomerId { get; set; } = null!;

    public AppUser Customer { get; set; } = null!;

    public AppUser SaleStaff { get; set; } = null!;
}
