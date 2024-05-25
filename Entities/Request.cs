using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JPOS_Bussiness_Objects
{
    internal class Request
    {
        private string _id {  get; set; }
        private string _type { get; set; }
        private string _style { get; set; }
        private string _size { get; set; }
        private string _quality { get; set; }

        public Request(string id, string type, string style, string size, string quality)
        {
            _id = id;
            _type = type;
            _style = style;
            _size = size;
            _quality = quality;
        }
    }
}
