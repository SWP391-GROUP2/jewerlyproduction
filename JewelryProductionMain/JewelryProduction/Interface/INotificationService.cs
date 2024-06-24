using System.Threading.Tasks;

namespace JewelryProduction.Interface
{
    public interface INotificationService
    {
        Task SendNotificationToUserAsync(string userId, string message);
        Task SendNotificationToRoleAsync(string role, string message);
    }
}
