using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    internal class Order
    {
        private string _id {  get; set; }
        private DateTime _date {  get; set; }
        private double _depositAmount { get; set; }
        private string _status {  get; set; }
        private double _totalPrice {  get; set; }

        public Order(string id, DateTime date, double depositAmount, string status, double totalPrice)
        {
            _id = id;
            _date = date;
            _depositAmount = depositAmount;
            _status = status;
            _totalPrice = totalPrice;
        }
    }
}
