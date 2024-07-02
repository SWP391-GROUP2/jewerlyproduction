using AutoMapper;
using JewelryProduction.DbContext;
using JewelryProduction.DTO.BasicDTO;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;

namespace JewelryProduction.Repositories
{
    public class SaleStaffRepository : ISaleStaffRepository
    {
        private readonly JewelryProductionContext _context;
        private readonly IMapper _mapper;

        public SaleStaffRepository(JewelryProductionContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<UserWithCountDTO>> GetStaffs()
        {
            var users = await _context.UserRoles
                .Join(_context.Users, ru => ru.UserId, u => u.Id, (ru, u) => new { ru, u })
                .Join(_context.Roles, combined => combined.ru.RoleId, r => r.Id, (combined, r) => new { combined, r })
                .Where(result => result.r.Name.Equals("salestaff"))
                .Select(result => new
                {
                    User = _mapper.Map<AppUserDTO>(result.combined.u),
                    RequestCount = _context.CustomerRequests
                        .Where(cr => cr.SaleStaffId != null && cr.SaleStaffId == result.combined.u.Id)
                        .Count()
                })
                .ToListAsync();

            var result = users.Select(u => new UserWithCountDTO
            {
                AppUser = u.User,
                count = u.RequestCount
            }).ToList();

            return result;
        }

    }
}
