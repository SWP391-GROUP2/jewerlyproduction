using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;

namespace JewelryProduction.Repositories
{
    public class _3dDesignRepository : I3dDesignRepository
    {
        private readonly JewelryProductionContext _context;

        public _3dDesignRepository(JewelryProductionContext context)
        {
            _context = context;
        }

        public Task<_3ddesignDTO> UploadImage()
        {
            
        }
    }
}
