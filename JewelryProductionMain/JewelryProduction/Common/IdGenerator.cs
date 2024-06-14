using JewelryProduction.DbContext;
using Microsoft.EntityFrameworkCore;
using System;

namespace JewelryProduction.Common
{
    public class IdGenerator
    {
        private static Random _random = new Random();
        public static async Task<string> GenerateUniqueId<T>(JewelryProductionContext context, string prefix, int lenght) where T : class
        {
            string id;
            bool exists;
            do
            {
                id = GenerateId(prefix, lenght);
                exists = await context.Set<T>().AnyAsync(e => EF.Property<string>(e, "Id") == id);
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
