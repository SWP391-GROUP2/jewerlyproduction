using BusinessObject;
using DAO;
using Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class UserRepository : IUserRepository
    {

        private UserDao _userDao;
        public UserRepository(UserDao userDao)
        {
            _userDao = userDao;
        }

        public User GetUserByEmail(string email) => _userDao.GetUserByEmail(email);

        public User GetUserByName(string name) => _userDao.GetUserByName(name);

        public ICollection<User> GetUsers() => _userDao.GetUsers();

        public bool UserExists(string email) => _userDao.UserExists(email);

        public bool ValidateCredentials(string email, string password) => _userDao.ValidateCredentials(email, password);
    }
}
