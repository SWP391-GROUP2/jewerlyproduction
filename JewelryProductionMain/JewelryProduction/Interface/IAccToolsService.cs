namespace JewelryProduction.Interface
{
    public interface IAccToolsService
    {
        public string ExtractEmailFromToken(string token);
        public void CleanupExpiredKeys();
    }
}
