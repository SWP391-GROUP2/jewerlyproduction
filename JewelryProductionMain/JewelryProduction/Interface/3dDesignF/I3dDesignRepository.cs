using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;

namespace JewelryProduction.Interface
{
    public interface I3dDesignRepository
    {
        Task AddDesignAsync(_3ddesign design);
        Task<AppUser> FindUserByEmailAsync(string email);
        Task<List<Get3dDesignDTO>> Get_3Ddesigns();
        Task<Get3dDesignDTO> Get_3Ddesign(string id);
    }
}
