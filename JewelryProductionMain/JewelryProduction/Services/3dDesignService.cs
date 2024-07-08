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

        public async Task<Get3dDesignDTO> Get_3Ddesign(string id) => await _repository.Get_3Ddesign(id);

        public async Task<List<Get3dDesignDTO>> Get_3Ddesigns() => await _repository.Get_3Ddesigns();

        public async Task<string> UploadDesignAsync(_3ddesignDTO design, string token)
        {
            var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken jwtToken = handler.ReadJwtToken(token);
            var email = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "email")?.Value;
            var user = await _repository.FindUserByEmailAsync(email);

            if (user == null || string.IsNullOrWhiteSpace(token))
                throw new ArgumentException("Invalid credentials");

            var folder = "3D Designs";
            var avatarUrl = await _cloudinaryService.UploadImageAsync(design.Image, folder);
            var url = avatarUrl.Url.ToString();

            var designEntity = new _3ddesign
            {
                _3dDesignId = design._3dDesignId,
                DesignName = design.DesignName,
                Image = url,
                CustomizeRequestId = design.CustomizeRequestId,
                ProductSampleId = design.ProductSampleId,
                DesignStaffId = user.Id
            };

            await _repository.AddDesignAsync(designEntity);
            return "Design uploaded successfully";
        }

        public Task<string> UploadDesignAsync(Get3dDesignDTO design, string token)
        {
            throw new NotImplementedException();
        }
    }
}
