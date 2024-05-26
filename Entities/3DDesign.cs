using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JPOS_Bussiness_Objects
{
    internal class _3DDesign
    {
        private string _id {  get; set; }
        private string _name { get; set; }
        private string _description { get; set; }

        private _3DDesign(string id, string name, string description)
        {
            _id = id;
            _name = name;
            _description = description;
        }
    }
}
