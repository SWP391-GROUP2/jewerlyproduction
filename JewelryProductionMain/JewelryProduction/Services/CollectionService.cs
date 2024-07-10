using JewelryProduction.DTO;
using JewelryProduction.Interface;

namespace JewelryProduction.Services
{
    public class CollectionService : ICollectionService
    {
        private readonly ICollectionRepository _collectionRepository;
        private readonly IProductSampleRepository _productSampleRepository;

        public CollectionService(ICollectionRepository collectionRepository, IProductSampleRepository productSampleRepository)
        {
            _collectionRepository = collectionRepository;
            _productSampleRepository = productSampleRepository;
        }

        public async Task AddProductSamplesToCollectionByStyleAsync(string collectionId, string style)
        {
            if (string.IsNullOrWhiteSpace(collectionId))
            {
                throw new ArgumentException("Collection ID cannot be null or empty");
            }

            if (string.IsNullOrWhiteSpace(style))
            {
                throw new ArgumentException("Style cannot be null or empty");
            }

            var productSamples = await _collectionRepository.GetProductSamplesByStyleAsync(style);
            if (productSamples == null || !productSamples.Any())
            {
                throw new ArgumentException("No product samples found for the given style");
            }

            await _collectionRepository.AddProductSamplesToCollectionAsync(collectionId, productSamples);
        }
        public async Task AddProductSamplesToCollectionAsync(AddProductSampleToCollectionDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.collectionId))
            {
                throw new ArgumentException("Collection ID cannot be null or empty");
            }
            var productSamples = await _productSampleRepository.GetProductSamplesByListOfIdsAsync(dto.productSampleIds);
            if (productSamples == null || !productSamples.Any())
            {
                throw new ArgumentException("No product samples found for the given style");
            }

            await _collectionRepository.AddProductSamplesToCollectionAsync(dto.collectionId, productSamples);
        }
    }
}
