using JewelryProduction.DTO;
using JewelryProduction.Interface;
using JewelryProduction.Repositories;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.IdentityModel.Tokens.Jwt;

namespace JewelryProduction.Services
{
    public class _3dDesignService : I3dDesignService
    {
        private readonly I3dDesignRepository _repository;
        private readonly ICloudinaryService _cloudinaryService;

        public _3dDesignService(I3dDesignRepository repository, ICloudinaryService cloudinaryService)
        {
            _repository = repository;
            _cloudinaryService = cloudinaryService;
        }

        public async Task DeleteDesignAsync(string id)
        {
            await _repository.DeleteDesignAsync(id);
        }

        public async Task<Get3dDesignDTO> Get_3Ddesign(string id) => await _repository.Get_3Ddesign(id);

        public async Task<List<Get3dDesignDTO>> Get_3Ddesigns() => await _repository.Get_3Ddesigns();

        public async Task<string> UploadDesignAsync(_3ddesignDTO design)
        {
            var folder = "3D Designs";
            var avatarUrl = await _cloudinaryService.UploadImageAsync(design.Image, folder);
            var url = avatarUrl.Url.ToString();

            var designEntity = new _3ddesign
            {
                _3dDesignId = design._3dDesignId,
                DesignName = design.DesignName,
                Image = url,
                OrderId = design.OrderId,
                ProductSampleId = design.ProductSampleId,
                DesignStaffId = design.DesignStaffId
            };

            await _repository.AddDesignAsync(designEntity);
            return "Design uploaded successfully";
        }
    }
}