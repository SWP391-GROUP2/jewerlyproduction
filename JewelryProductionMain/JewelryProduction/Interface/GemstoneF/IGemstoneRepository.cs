using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface IGemstoneRepository : IRepository<Gemstone>
    {
        Task<IEnumerable<Gemstone>> GetByCustomizeRequestIdAsync(string customizeRequestId);
        Task<List<Gemstone>> GetPrimaryGemstonesAsync(IEnumerable<string> gemstoneIds);
        Task<List<Gemstone>> GetAdditionalGemstonesAsync(IEnumerable<string> gemstoneIds);

        //Manh's
        Task AddGemstoneAsync(Gemstone gemstone);
        Task<List<GetGemstoneDTO>> GetGemstones();
        Task<GetGemstoneDTO> GetGemstone(string id);
        Task<string> UpdateProductSample(string gemstoneId, string sampleId);
    }
}
