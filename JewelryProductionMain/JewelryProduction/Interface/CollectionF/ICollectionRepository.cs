namespace JewelryProduction.Interface
{
    public interface ICollectionRepository : IRepository<Collection>
    {
        Task<Collection> GetCollectionByIdAsync(string collectionId);
        Task<List<ProductSample>> GetProductSamplesByStyleAsync(string style);
        Task AddProductSamplesToCollectionAsync(string collectionId, List<ProductSample> productSamples);
    }
}
