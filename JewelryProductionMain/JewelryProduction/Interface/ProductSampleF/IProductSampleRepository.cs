namespace JewelryProduction.Interface
{
    public interface IProductSampleRepository : IRepository<ProductSample>
    {
        Task<List<Gemstone>> GetGemstonesByNamesAsync(List<string> gemstoneNames);
        Task<ProductSample> GetProductSampleByIdAsync(string productSampleId);
    }
}
