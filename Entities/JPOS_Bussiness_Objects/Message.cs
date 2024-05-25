using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JPOS_Bussiness_Objects
{
    internal class Message
    {
        private string _id;
        private string _text {  get; set; }
        private string _timeStamp { get; set; }

        public Message(string id, string text, string timeStamp)
        {
            _id = id;
            _text = text;
            _timeStamp = timeStamp;
        }
    }
}
