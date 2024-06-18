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
        public async Task<List<ProductSample>> GetRecommendedSamples(CustomerRequestDTO chosenSample)
        {
            var allSamples = await _context.ProductSamples
             .Include(ps => ps.Gemstones)
             .ToListAsync();

            var recommendedSamples = allSamples
                .Select(sample => new
                {
                    Sample = sample,
                    Similarity = CalculateSimilarity(chosenSample, sample)
                })
                .OrderByDescending(s => s.Similarity)
                .Take(5) // For example, get top 5 recommendations
                .Select(s => s.Sample)
                .ToList();

            return recommendedSamples;
        }
        public double CalculateSimilarity(CustomerRequestDTO sample1, ProductSample sample2)
        {
            var gemstones =  _context.Gemstones
            .Where(g => sample1.GemstoneName.Contains(g.Name))
            .ToListAsync();

            double similarity = 0;

            if (sample1.Type == sample2.Type) similarity += 1;
            if (sample1.Style == sample2.Style) similarity += 1;
            if (sample1.Size == sample2.Size) similarity += 1;
            if (sample2.Gold != null && sample1.GoldType == sample2.Gold.GoldType)
            {
                similarity += 1;
            }
            if (gemstones == sample2.Gemstones) similarity += 1;
            if (sample1.GemstoneName != null && sample1.GemstoneName.Any())
            {
                var sample2GemstoneNames = sample2.Gemstones.Select(g => g.Name).ToList();
                foreach (var gemstonename in sample1.GemstoneName)
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
