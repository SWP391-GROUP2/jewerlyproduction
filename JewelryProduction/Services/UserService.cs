using BusinessObject;
using DAO;
using Repositories;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class UserService : IUserService
    {
        private UserRepository _repository;

        public UserService(UserRepository repository)
        {
            _repository = repository;
        }
        public User GetUserByEmail(string email) => _repository.GetUserByEmail(email);

        public User GetUserByName(string name) => _repository.GetUserByName(name);

        public ICollection<User> GetUsers() => _repository.GetUsers();

        public bool UserExists(string email) => _repository.UserExists(email);

        public bool ValidateCredentials(string email, string password) => _repository.ValidateCredentials(email, password);
    }
}
