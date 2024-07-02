using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using JewelryProduction.Interface;
using Microsoft.Extensions.Configuration;

public class CloudinaryService : ICloudinaryService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(IConfiguration configuration)
    {
        var cloudinaryAccount = new Account(
            configuration["Cloudinary:CloudName"],
            configuration["Cloudinary:ApiKey"],
            configuration["Cloudinary:ApiSecret"]);
        

        _cloudinary = new Cloudinary(cloudinaryAccount);
    }

    public string GetUrl(string publicId)
    {
        return _cloudinary.Api.UrlImgUp.BuildUrl(publicId);
    }

    public async Task<ImageUploadResult> UploadImageAsync(IFormFile file, string folder)
    {
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0)
        {
            using (var stream = file.OpenReadStream())
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Quality("auto").FetchFormat("auto"),
                    Folder = folder
                };

                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
        }
        return uploadResult;
    }
}
