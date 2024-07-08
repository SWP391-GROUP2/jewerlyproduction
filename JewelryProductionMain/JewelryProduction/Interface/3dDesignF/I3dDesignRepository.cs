using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;

namespace JewelryProduction.Interface
{
    public interface I3dDesignRepository
    {
        Task<_3ddesignDTO> UploadImage();
    }
}
