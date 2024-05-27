using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class ProductSample
    {
        private string _productSampleID {  get; set; }
        private string _productName { get; set; }
        private string _description { get; set; }
        private string _type { get; set; }
        private string _style {  get; set; }
        private float _size { get; set; }
        private int _price { get; set; }
        private string _goldId { get; set; }

        public ProductSample(string productSampleID, string productName, string description, string type, string style, float size, int price, string goldId)
        {
            _productSampleID = productSampleID;
            _productName = productName;
            _description = description;
            _type = type;
            _style = style;
            _size = size;
            _price = price;
            _goldId = goldId;
        }
    }
}
