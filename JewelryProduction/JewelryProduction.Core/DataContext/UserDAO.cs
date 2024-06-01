using JewelryProduction.Core.Entities;

namespace JewelryProduction.Core;

public class UserDAO
{
    private readonly JewelryProductionContext dbContext = null;
    public UserDAO()
    {
        if (dbContext == null)
            dbContext = new JewelryProductionContext();
    }

    public async Task<bool> Authencate(LoginRequest request)
    {
        var user = await dbContext.Users.FindAsync(request.UserName);
        if (user == null)
            return false;
        var result = await dbContext.Users.
    }
}
