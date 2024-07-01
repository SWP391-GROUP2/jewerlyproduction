using CloudinaryDotNet.Actions;
using CloudinaryDotNet;

namespace JewelryProduction.Interface
{
    public interface ICloudinaryService
    {
        public Task<ImageUploadResult> UploadImageAsync(IFormFile file);

        public string GetUrl(string publicId);
}
}
