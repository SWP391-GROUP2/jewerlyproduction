using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using JewelryProduction.Common;
using Microsoft.EntityFrameworkCore;
using JewelryProduction.Repositories;
using NuGet.Protocol.Core.Types;

namespace JewelryProduction.Services
{
    public class ProductSampleService: IProductSampleService
    {
        private readonly IProductSampleRepository _productSampleRepository;

        public ProductSampleService( IProductSampleRepository repository)
        {

            _productSampleRepository = repository;
        }
        public async Task<List<ProductSampleDTO>> GetRecommendedSamples(string? type, string? style, double? size, string? goldType, List<string>? gemstoneName)
        {
            var allSamples = await _productSampleRepository.GetAllAsync();

            var recommendedSamples = allSamples
                .Select(sample => new
                {
                    Sample = sample,
                    Similarity = CalculateSimilarity(type, style, size, goldType, gemstoneName, sample)
                })
                .OrderByDescending(s => s.Similarity)
                .Take(5) // For example, get top 5 recommendations
                .Select(s => new ProductSampleDTO
                {
                    ProductSampleId = s.Sample.ProductSampleId,
                    ProductName = s.Sample.ProductName,
                    Description = s.Sample.Description,
                    Type = s.Sample.Type,
                    Style = s.Sample.Style,
                    Size = s.Sample.Size,
                    Price = s.Sample.Price,
                    GoldType = s.Sample.Gold.GoldType,
                    Image = s.Sample._3ddesigns.FirstOrDefault()?.Image // Take the first image URL
                })
                .ToList();

            return recommendedSamples;
        }
        public async Task<PrefillDTO> PrefillCustomizeRequestAsync(string productSampleId)
        {
            var productSample = await _productSampleRepository.GetProductSampleByIdAsync(productSampleId);

            if (productSample == null)
            {
                throw new KeyNotFoundException($"Product sample with ID {productSampleId} was not found.");
            }

            var primaryGemstone = productSample.Gemstones
                .Where(g => g.CaratWeight > 0.3)
                .Select(g => new AddGemstoneDTO
                {
                    Name = g.Name,
                    Clarity = g.Clarity,
                    Color = g.Color,
                    Shape = g.Shape,
                    Size = g.Size,
                    Cut = g.Cut,
                    CaratWeight = g.CaratWeight,
                }).FirstOrDefault();

            var additionalGemstones = productSample.Gemstones
                .Where(g => g.CaratWeight <= 0.3)
                .Select(g => new Gemstone
                {
                    Name = g.Name,
                    Clarity = g.Clarity,
                    Color = g.Color,
                    Shape = g.Shape,
                    Size = g.Size,
                    Cut = g.Cut,
                    CaratWeight = g.CaratWeight,
                }).ToList();

            return new PrefillDTO
            {
                Type = productSample.Type,
                Style = productSample.Style,
                Quantity = 1, // Default quantity
                PrimaryGemstone = primaryGemstone,
                AdditionalGemstone = additionalGemstones.Select(g => g.Name).ToList(),
                GoldType = productSample.Gold.GoldType,
            };
        }
        public double CalculateSimilarity(string? type, string? style, double? size, string? goldType, List<string>? gemstoneName, ProductSample sample2)
        {
            double similarity = 0;

            if (sample2.Type is not null && type == sample2.Type) similarity += 1;
            if (sample2.Style is not null && style == sample2.Style) similarity += 1;
            if (sample2.Size is not null && size == sample2.Size) similarity += 1;
            if (sample2.Gold is not null && goldType == sample2.Gold.GoldType)
            {
                similarity += 1;
            }

            if (gemstoneName != null && gemstoneName.Any())
            {
                var sample2GemstoneNames = sample2.Gemstones.Select(g => g.Name).ToList();
                foreach (var gemstonename in gemstoneName)
                {
                    if (sample2GemstoneNames.Contains(gemstonename))
                    {
                        similarity += 1;
                        break;
                    }
                }
            }

            return similarity;
        }

        public async Task<string> AddSampleAsync(AddProductSampleDTO productSample)
        {
            await _productSampleRepository.AddSampleAsync(productSample);
            return "Completed";
        }

        public async Task<List<GetProductSampleDTO>> GetSamples() => await _productSampleRepository.GetSamples();

        public async Task<GetProductSampleDTO> GetSample(string id) => await _productSampleRepository.GetSample(id);
    }
}
