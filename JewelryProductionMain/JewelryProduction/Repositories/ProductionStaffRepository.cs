using AutoMapper;
using JewelryProduction.DbContext;
using JewelryProduction.DTO.BasicDTO;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class ProductionStaffRepository : IProductionStaffRepository
    {
        private readonly JewelryProductionContext _context;
        private readonly IMapper _mapper;

        public ProductionStaffRepository(JewelryProductionContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<StaffWithCountDTO>> GetStaffs()
        {
            var users = await _context.UserRoles
                .Join(_context.Users, ru => ru.UserId, u => u.Id, (ru, u) => new { ru, u })
                .Join(_context.Roles, combined => combined.ru.RoleId, r => r.Id, (combined, r) => new { combined, r })
                .Where(result => result.r.Name.Equals("productionstaff"))
                .Select(result => new
                {
                    User = _mapper.Map<AppUserDTO>(result.combined.u),
                    OrderCount = _context.Orders
                        .Where(cr => cr.ProductionStaffId == result.combined.u.Id)
                        .Count()
                })
                .ToListAsync();

            var result = users.Select(u => new StaffWithCountDTO
            {
                AppUser = u.User,
                orderCount = u.OrderCount
            }).ToList();

            return result;
        }
    }
}
