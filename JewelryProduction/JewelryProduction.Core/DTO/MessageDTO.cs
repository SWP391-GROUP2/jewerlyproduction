using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JewelryProduction.Core.DTO
{
    public class MessageDTO
    {
        public string MessageId { get; set; } = null!;

        public string MessageText { get; set; } = null!;

        public DateTime Timestamp { get; set; }

        public string SaleStaffId { get; set; } = null!;

        public string CustomerId { get; set; } = null!;
    }
}
