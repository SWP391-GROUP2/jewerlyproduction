using JewelryProduction.DbContext;
using Microsoft.EntityFrameworkCore;
using System;

namespace JewelryProduction.Common
{
    public class IdGenerator
    {
        private static Random _random = new Random();
        public static async Task<string> GenerateUniqueId<T>(JewelryProductionContext context, string prefix, int length) where T : class
        {
            string id;
            bool exists;
            var entityType = context.Model.FindEntityType(typeof(T));
            if (entityType == null)
            {
                throw new InvalidOperationException($"Entity type {typeof(T).Name} not found in the DbContext.");
            }

            var keyProperty = entityType.FindPrimaryKey().Properties.FirstOrDefault();
            if (keyProperty == null)
            {
                throw new InvalidOperationException($"No primary key defined for entity type {typeof(T).Name}.");
            }

            var keyPropertyName = keyProperty.Name;

            do
            {
                id = GenerateId(prefix, length);
                exists = await context.Set<T>().AnyAsync(e => EF.Property<string>(e, keyPropertyName) == id);
            } while (exists);

            return id;
        }
    private static string GenerateId(string prefix, int length)
        {
            var id = prefix;
            for (int i = 0; i < length; i++)
            {
                id += _random.Next(0, 10); // Add random digits
            }
            return id;
        }

    }
}
