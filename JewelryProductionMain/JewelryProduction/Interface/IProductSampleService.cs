using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface IProductSampleService
    {
        Task<List<ProductSampleDTO>> GetRecommendedSamples(CustomerRequestDTO chosenSample);
    }
}
