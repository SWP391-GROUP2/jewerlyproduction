using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JPOS_Bussiness_Objects
{
    internal class Admin : User
    {
        private Admin(string id, string name, string dateOfBirth, string phoneNumber, string accountID, string username, string password, string email) : base(id, name, dateOfBirth, phoneNumber, accountID, username, password, email)
        {}
    }
}
