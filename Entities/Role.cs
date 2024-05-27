using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    internal class Role
    {
        private int _roleID { get; set; }
        private string _name { get; set; }
        private string _description { get; set; }
        private int _accessLevel { get; set; }

        public Role(int roleID, string name, string description, int accessLevel)
        {
            _roleID = roleID;
            _name = name;
            _description = description;
            _accessLevel = accessLevel;
        }
    }
}
