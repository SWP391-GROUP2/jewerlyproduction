using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Repositories
{
    public class GemstoneRepository : IGemstoneRepository
    {
        private readonly JewelryProductionContext _context;

        public GemstoneRepository(JewelryProductionContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Gemstone>> GetByCustomizeRequestIdAsync(string customizeRequestId)
        {
            return await _context.Gemstones
                                 .Where(g => g.CustomizeRequestId == customizeRequestId)
                                 .ToListAsync();
        }

        public async Task<Gemstone> GetByIdAsync(object id)
        {
            return await _context.Gemstones.FindAsync(id);
        }

        public async Task<IEnumerable<Gemstone>> GetAllAsync()
        {
            return await _context.Gemstones.ToListAsync();
        }

        public async Task AddAsync(Gemstone entity)
        {
            await _context.Gemstones.AddAsync(entity);
        }

        public void Update(Gemstone entity)
        {
            _context.Gemstones.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<List<Gemstone>> GetPrimaryGemstonesAsync(IEnumerable<string> gemstoneIds)
        {
            return await _context.Gemstones
                .Where(g =>
                    gemstoneIds.Contains(g.GemstoneId) &&
                    g.ProductSample == null && g.CustomizeRequestId == null)
                .GroupBy(g => g.Name)
                .Select(g => g.FirstOrDefault())
                .OrderBy(_ => Guid.NewGuid())
                .Take(2)
                .ToListAsync();
        }

        public async Task<List<Gemstone>> GetAdditionalGemstonesAsync(IEnumerable<string> gemstoneIds)
        {
            return await _context.Gemstones
                .Where(g => gemstoneIds.Contains(g.GemstoneId))
                .GroupBy(g => g.Name)
                .Select(g => g.FirstOrDefault())
                .OrderBy(_ => Guid.NewGuid())
                .Take(2)
                .ToListAsync();
        }

        public async Task<List<GetGemstoneDTO>> GetGemstones()
        {
            var gemstones = await _context.Gemstones
                .Include(g => g.CustomizeRequestIdNavigation)
                .Include(g => g.Category)
                .Include(g => g.ProductSample)
                .ToListAsync();

            var result = gemstones.Select(gemstone => new GetGemstoneDTO
            {
                GemstoneId = gemstone.GemstoneId,
                Name = gemstone.Name,
                Shape = gemstone.Shape,
                Size = gemstone.Size,
                Color = gemstone.Color,
                CaratWeight = gemstone.CaratWeight,
                Cut = gemstone.Cut,
                Clarity = gemstone.Clarity,
                Price = gemstone.Price,
                Image = gemstone.Image,
                ProductSampleId = gemstone.ProductSampleId,
                CustomizeRequestId = gemstone.CustomizeRequestId,
                CategoryId = gemstone.CategoryId,
                CategoryName = gemstone.Category.CategoryName,
            }).ToList();
            return result;
        }

        public async Task AddGemstoneAsync(Gemstone gemstone)
        {
            _context.Gemstones.Add(gemstone);
            await _context.SaveChangesAsync();
        }

        public async Task<GetGemstoneDTO> GetGemstone(string id)
        {
            var gemstone = await _context.Gemstones
                .Where(g => g.GemstoneId == id)
                .Include(g => g.CustomizeRequestIdNavigation)
                .Include(g => g.Category)
                .Include(g => g.ProductSample)
                .FirstOrDefaultAsync();

            if (gemstone == null)
                throw new Exception($"Gemstone with ID {id} not found.");

            var result = new GetGemstoneDTO
            {
                GemstoneId = gemstone.GemstoneId,
                Name = gemstone.Name,
                Shape = gemstone.Shape,
                Size = gemstone.Size,
                Color = gemstone.Color,
                CaratWeight = gemstone.CaratWeight,
                Cut = gemstone.Cut,
                Clarity = gemstone.Clarity,
                Price = gemstone.Price,
                Image = gemstone.Image,
                ProductSampleId = gemstone.ProductSampleId,
                CustomizeRequestId = gemstone.CustomizeRequestId,
                CategoryId = gemstone.CategoryId,
                CategoryName = gemstone.Category?.CategoryName,
            };

            return result;
        }

        public async Task<string> UpdateProductSample(string gemstoneId, string sampleId)
        {
            if (string.IsNullOrWhiteSpace(gemstoneId) || string.IsNullOrWhiteSpace(sampleId))
            {
                return "GemstoneId and SampleId cannot be null or empty.";
            }

            var gemstone = await _context.Gemstones.FindAsync(gemstoneId);

            if (gemstone == null)
            {
                return "Gemstone not found.";
            }

            if (gemstone.ProductSampleId != null)
            {
                return "The gemstone is already associated with another sample.";
            }

            gemstone.ProductSampleId = sampleId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Handle concurrency issues here
                return "An error occurred while updating the gemstone.";
            }

            return "Product sample updated successfully.";
        }

    }
}
