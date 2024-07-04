using JewelryProduction.DTO;
using JewelryProduction.Interface;
using JewelryProduction.Repositories;

namespace JewelryProduction.Services
{
    public class _3dDesignService : I3dDesignService
    {
        private readonly I3dDesignRepository _repository;

        public _3dDesignService(_3dDesignRepository repository)
        {
            _repository = repository;
        }

        public Task<_3ddesignDTO> UploadImage()
        {
            throw new NotImplementedException();
        }
    }
}
