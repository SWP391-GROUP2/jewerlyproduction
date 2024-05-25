using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace JPOS_Bussiness_Objects
{
    internal class User
    {
        private string _id { get; set; }
        private string _name { get; set; }
        private string _dateOfBirth { get; set; }
        private string _phoneNumber { get; set; }
        private string _accountID { get; set; }
        private string _username { get; set; }
        private string _password { get; set; }
        private string _email { get; set; }

        public User(string id, string name, string dateOfBirth, string phoneNumber, string accountID, string username, string password, string email)
        {
            _id = id;
            _name = name;
            _dateOfBirth = dateOfBirth;
            _phoneNumber = phoneNumber;
            _accountID = accountID;
            _username = username;
            _password = password;
            _email = email;
        }
    }
}
