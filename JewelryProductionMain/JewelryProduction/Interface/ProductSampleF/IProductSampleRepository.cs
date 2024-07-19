using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface IProductSampleRepository : IRepository<ProductSample>
    {
        Task<List<Gemstone>> GetGemstonesByNamesAsync(List<string> gemstoneNames);
        Task<ProductSample> GetProductSampleByIdAsync(string productSampleId);
        Task<List<ProductSample>> GetProductSamplesByListOfIdsAsync(List<string> productSampleIds);
        Task<ProductSample> AddSampleAsync(AddProductSampleDTO productSample);
        Task<List<GetProductSampleDTO>> GetSamples();
        Task<GetProductSampleDTO> GetSample(string id);
    }
}
