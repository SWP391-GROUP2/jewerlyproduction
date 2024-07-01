using CloudinaryDotNet.Actions;
using CloudinaryDotNet;

namespace JewelryProduction.Interface
{
    public interface ICloudinaryService
    {
        public Task<ImageUploadResult> UploadImageAsync(IFormFile file, string folder);

        public string GetUrl(string publicId);
}
}
