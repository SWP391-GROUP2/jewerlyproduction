using System.Threading.Tasks;

namespace JewelryProduction.Interface
{
    public interface INotificationService
    {
        Task SendNotificationToUserfAsync(string user, string senderId, string message);
        Task SendNotificationToRoleAsync(string role, string senderId, string message);
    }
}
