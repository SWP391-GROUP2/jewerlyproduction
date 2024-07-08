using JewelryProduction.DbContext;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly JewelryProductionContext _context;

        public UserRepository(JewelryProductionContext context)
        {
            _context = context;
        }

        public async Task<AppUser> GetByIdAsync(object id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<IEnumerable<AppUser>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task AddAsync(AppUser entity)
        {
            await _context.Users.AddAsync(entity);
        }

        public void Update(AppUser entity)
        {
            _context.Users.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
