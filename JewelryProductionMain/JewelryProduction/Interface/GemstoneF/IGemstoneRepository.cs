namespace JewelryProduction.Interface
{
    public interface IGemstoneRepository : IRepository<Gemstone>
    {
        Task<IEnumerable<Gemstone>> GetByCustomizeRequestIdAsync(string customizeRequestId);
        Task<List<Gemstone>> GetPrimaryGemstonesAsync(IEnumerable<string> gemstoneIds);
        Task<List<Gemstone>> GetAdditionalGemstonesAsync(IEnumerable<string> gemstoneIds);
    }
}
