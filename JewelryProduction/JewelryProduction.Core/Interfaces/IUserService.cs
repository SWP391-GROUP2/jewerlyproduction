namespace JewelryProduction.Core.Interfaces
{
    public interface IUserService
    {
        Task<bool> Authenticate(LoginRequest request);
        Task<bool> Register(RegisterRequest request);

    }
}
