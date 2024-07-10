using JewelryProduction.DTO;

namespace JewelryProduction.Interface
{
    public interface I3dDesignService
    {
        Task<string> UploadDesignAsync(_3ddesignDTO design);
        Task<List<Get3dDesignDTO>> Get_3Ddesigns();
        Task<Get3dDesignDTO> Get_3Ddesign(string id);
        Task DeleteDesignAsync(string id);
    }
}
