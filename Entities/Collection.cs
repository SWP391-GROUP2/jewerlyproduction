using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JPOS_Bussiness_Objects
{
    internal class Collection
    {
        public string _id {  get; set; }
        public string _name { get; set; }
        public string _description { get; set; }

        public Collection(string id, string name, string description)
        {
            _id = id;
            _name = name;
            _description = description;
        }
    }
}
