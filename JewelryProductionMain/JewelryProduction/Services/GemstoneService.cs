using JewelryProduction.DTO;
using JewelryProduction.Interface;
using JewelryProduction.Interface.GemstoneF;

namespace JewelryProduction.Services
{
    public class GemstoneService : IGemstoneService
    {
        private readonly IGemstoneRepository _repository;
        private readonly ICloudinaryService _cloudinaryService;

        public GemstoneService(IGemstoneRepository repository, ICloudinaryService cloudinaryService)
        {
            _repository = repository;
            _cloudinaryService = cloudinaryService;
        }

        public async Task<GetGemstoneDTO> GetGemstone(string id) => await _repository.GetGemstone(id);

        public async Task<List<GetGemstoneDTO>> GetGemstones() => await _repository.GetGemstones();

        public async Task<string> UploadGemstoneAsync(AddGemstoneDTO gemstone)
        {
            var folder = "Gemstones";
            var gemstoneUrl = await _cloudinaryService.UploadImageAsync(gemstone.Image, folder);
            var url = gemstoneUrl.Url.ToString();

            var gemstoneEntity = new Gemstone
            {
                GemstoneId = gemstone.GemstoneId,
                Name = gemstone.Name,
                Shape = gemstone.Shape,
                Size = gemstone.Size,
                Color = gemstone.Color,
                CaratWeight = gemstone.CaratWeight,
                Cut = gemstone.Cut,
                Clarity = gemstone.Clarity,
                Price = gemstone.Price,
                Image = url,
                ProductSampleId = gemstone.ProductSampleId,
                CustomizeRequestId = gemstone.CustomizeRequestId,
                CategoryId = gemstone.CategoryId,
            };

            await _repository.AddGemstoneAsync(gemstoneEntity);
            return "Gemstone uploaded successfully";
        }
    }
}
