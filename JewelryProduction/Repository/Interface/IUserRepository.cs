using BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interface
{
    public interface IUserRepository
    {
        public ICollection<User> GetUsers();
        public User GetUserByName(string name);
        public User GetUserByEmail(string email);
        public bool ValidateCredentials(string email, string password);
        public bool UserExists(string email);
    }
}
