using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;

namespace JewelryProduction.Interface
{
    public interface ICloudinaryService
    {
        public Task<string> UploadImageAsync(IFormFile file);

    }
}
