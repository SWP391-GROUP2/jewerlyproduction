namespace JewelryProduction.Interface
{
    public interface IProductSampleRepository : IRepository<ProductSample>
    {
        Task<ProductSample> GetProductSampleByIdAsync(string productSampleId);
    }
}
