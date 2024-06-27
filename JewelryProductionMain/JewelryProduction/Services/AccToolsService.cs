using JewelryProduction.DTO.Account;
using JewelryProduction.Interface;
using System.IdentityModel.Tokens.Jwt;

namespace JewelryProduction.Services
{
    public class AccToolsService
    {
        private static Dictionary<string, OtpEntry> otpStorage = new Dictionary<string, OtpEntry>();
        public async Task<string> ExtractEmailFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();

            if (!handler.CanReadToken(token))
            {
                throw new ArgumentException("Invalid token format");
            }

            JwtSecurityToken jwtToken;
            try
            {
                jwtToken = handler.ReadJwtToken(token);
            }
            catch (Exception ex)
            {
                throw new ArgumentException($"Error reading token: {ex.Message}");
            }

            var email = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "email")?.Value;

            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentException("Email claim not found in token");
            }

            return email;
        }

        public void CleanupExpiredKeys()
        {
            var expirationTime = TimeSpan.FromMinutes(10);
            var now = DateTime.UtcNow;
            var keysToRemove = otpStorage.Where(kvp => now - kvp.Value.TimeStamp > expirationTime)
                                         .Select(kvp => kvp.Key)
                                         .ToList();

            foreach (var key in keysToRemove)
            {
                otpStorage.Remove(key);
            }
        }
    }
}
