using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JPOS_Bussiness_Objects
{
    internal class Gemstone
    {
        public string _id {  get; set; }
        public string _name { get; set; }
        public string _color {  get; set; }
        public string _cut {  get; set; }
        public string _clarity {  get; set; }
        public double _caratWeight {  get; set; }
        public double _price {  get; set; }

        public Gemstone(string id, string name, string color, string cut, string clarity, double caratWeight, double price)
        {
            _id = id;
            _name = name;
            _color = color;
            _cut = cut;
            _clarity = clarity;
            _caratWeight = caratWeight;
            _price = price;
        }
    }
}
