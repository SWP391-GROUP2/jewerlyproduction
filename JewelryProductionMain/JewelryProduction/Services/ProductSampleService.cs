using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using JewelryProduction.Common;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Services
{
    public class ProductSampleService: IProductSampleService
    {
        private readonly JewelryProductionContext _context;

        public ProductSampleService(JewelryProductionContext context)
        {
            _context = context;
        }
        public async Task<List<ProductSampleDTO>> GetRecommendedSamples(string? type, string? style, double? size, string? goldType, List<string>? gemstoneName)
        {
            var allSamples = await _context.ProductSamples
             .Include(ps => ps.Gemstones)
             .Include(ps => ps._3ddesigns)
             .Include(ps => ps.Gold)
             .ToListAsync();

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
        public double CalculateSimilarity(string? type, string? style, double? size, string? goldType, List<string>? gemstoneName , ProductSample sample2)
        {
            var gemstones =  _context.Gemstones
            .Where(g => gemstoneName.Contains(g.Name))
            .ToListAsync();

            double similarity = 0;

            if (type == sample2.Type) similarity += 1;
            if (style == sample2.Style) similarity += 1;
            if (size == sample2.Size) similarity += 1;
            if (sample2.Gold != null && goldType == sample2.Gold.GoldType)
            {
                similarity += 1;
            }
            if (gemstones == sample2.Gemstones) similarity += 1;
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
    }
}
