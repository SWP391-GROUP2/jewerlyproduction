using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface IProductSampleService
    {
        Task<List<ProductSampleDTO>> GetRecommendedSamples(string? type, string? style, double? size, string? goldType, List<string>? gemstoneName);
    }
}
