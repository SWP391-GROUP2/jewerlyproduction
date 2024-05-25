using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    internal class Gold
    {
        public string _id {  get; set; }
        public string _type { get; set; }
        public string _description {  get; set; }
        public double _price {  get; set; }
        public double _weight {  get; set; }

        public Gold(string id, string type, string description, double price, double weight)
        {
            _id = id;
            _type = type;
            _description = description;
            _price = price;
            _weight = weight;
        }
    }
}
