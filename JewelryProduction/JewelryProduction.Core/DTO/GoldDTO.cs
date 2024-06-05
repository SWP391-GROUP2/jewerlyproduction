using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JewelryProduction.Core.DTO
{
    public class GoldDTO
    {
        public string GoldId { get; set; } = null!;

        public string GoldType { get; set; } = null!;

        public double Weight { get; set; }

        public decimal PricePerGram { get; set; }
    }
}
