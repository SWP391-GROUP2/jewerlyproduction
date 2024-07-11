namespace JewelryProduction.Interface
{
    public interface IProductSampleRepository : IRepository<ProductSample>
    {
        Task<List<Gemstone>> GetGemstonesByNamesAsync(List<string> gemstoneNames);
        Task<ProductSample> GetProductSampleByIdAsync(string productSampleId);
        Task<List<ProductSample>> GetProductSamplesByListOfIdsAsync(List<string> productSampleIds);
        Task<List<ProductSample>> GetProductSamplesByCollectionIdAsync(string collectionId);
    }
}
