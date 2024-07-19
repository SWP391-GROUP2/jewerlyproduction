using JewelryProduction.DTO;

namespace JewelryProduction.Interface.GemstoneF
{
    public interface IGemstoneService
    {
        Task<string> UploadGemstoneAsync(AddGemstoneDTO gemstone);
        Task<List<GetGemstoneDTO>> GetGemstones();
        Task<GetGemstoneDTO> GetGemstone(string id);
        Task<string> UpdateProductSample(string gemstoneId, string sampleId);
    }
}
