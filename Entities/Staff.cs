using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JPOS_Bussiness_Objects
{
    internal class Staff : User
    {
        private string _role {  get; set; }
        public Staff(string ID, string name, string dateOfBirth, string phoneNumber, string accountID, string username, string password, string email, string role) : base(ID, name, dateOfBirth, phoneNumber, accountID, username, password, email)
        {
            _role = role;
        }
    }
}
