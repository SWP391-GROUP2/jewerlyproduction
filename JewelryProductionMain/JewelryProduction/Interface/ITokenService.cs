using System.Security.Claims;

namespace JewelryProduction.Interface
{
    public interface ITokenService
    {
        public Task<string> CreateAccessToken(AppUser user);
        public string CreateRefreshToken();
        Task<bool> ValidateRefreshToken(AppUser user, string refreshToken);
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
