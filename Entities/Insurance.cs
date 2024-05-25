using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    internal class Insurance
    {
        public string _id {  get; set; }
        public DateOnly _startDate { get; set; }
        public DateOnly _endDate { get; set; }

        public Insurance(string id, DateOnly startDate, DateOnly endDate)
        {
            _id = id;
            _startDate = startDate;
            _endDate = endDate;
        }
    }
}
