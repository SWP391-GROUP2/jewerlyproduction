using JewelryProduction.Core.Interface;
using JewelryProduction.Core;
using JewelryProduction.Core.Services;

namespace JewelryProduction
{
    public class StartUp
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Other service configurations...

            services.AddScoped<IUserService, UserService>();

            // Other service configurations...
        }

        // Other methods...
    }
}
}
