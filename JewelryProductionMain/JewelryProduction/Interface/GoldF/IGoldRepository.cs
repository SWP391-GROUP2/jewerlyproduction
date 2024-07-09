namespace JewelryProduction.Interface
{
    public interface IGoldRepository : IRepository<Gold>
    {
        Task<Gold> GetByTypeAsync(string goldType);
    }
}
