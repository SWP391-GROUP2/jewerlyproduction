using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface ICollectionService
    {
        Task AddProductSamplesToCollectionByStyleAsync(string collectionId, string style);
        Task AddProductSamplesToCollectionAsync(AddProductSampleToCollectionDTO dto);
    }
}
