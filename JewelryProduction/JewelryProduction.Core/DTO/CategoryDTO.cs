using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JewelryProduction.Core.DTO
{
    public class CategoryDTO
    {
        public string CategoryId { get; set; } = null!;

        public string CategoryName { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string GemstoneId { get; set; } = null!;
    }
}
