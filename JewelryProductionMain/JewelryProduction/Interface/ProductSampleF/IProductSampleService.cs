using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface IProductSampleService
    {
        Task<List<ProductSampleDTO>> GetRecommendedSamples(string? type, string? style, double? size, string? goldType, List<string>? gemstoneName);
        Task<List<ProductSample>> GetProductSamplesByCollectionIdAsync(string collectionId);
        Task<PrefillDTO> PrefillCustomizeRequestAsync(string productSampleId);
        double CalculateSimilarity(string? type, string? style, double? size, string? goldType, List<string>? gemstoneName, ProductSample sample2);
    }
}
