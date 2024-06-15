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
        public async Task<List<ProductSample>> GetRecommendedSamples(ProductSampleDTO chosenSample)
        {
            var allSamples = await _context.ProductSamples.ToListAsync();
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
        public double CalculateSimilarity(ProductSampleDTO sample1, ProductSample sample2)
        {
            var gemstones =  _context.Gemstones
            .Where(g => sample1.GemstoneId.Contains(g.GemstoneId))
            .ToListAsync();

            double similarity = 0;

            if (sample1.Type == sample2.Type) similarity += 1;
            if (sample1.Style == sample2.Style) similarity += 1;
            if (sample1.Size == sample2.Size) similarity += 1;
            if (sample1.GoldId == sample2.GoldId) similarity += 1;
            if (gemstones == sample2.Gemstones) similarity += 1;


            return similarity;
        }
    }
}
