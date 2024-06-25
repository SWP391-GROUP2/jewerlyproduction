using JewelryProduction.DbContext;
using JewelryProduction.Interface;
using Microsoft.AspNetCore.SignalR;

namespace JewelryProduction.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<MyHub> _hubContext;
        private readonly JewelryProductionContext _context;

        public NotificationService(IHubContext<MyHub> hubContext, JewelryProductionContext context)
        {
            _hubContext = hubContext;
            _context = context;
        }

        public async Task SendNotificationToUserAsync(string userId, string message)
        {
            var connectionId = MyHub.GetConnectionId(userId);
            if (!string.IsNullOrEmpty(connectionId))
            {
                await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveNotification", message);
            }
        }

        public async Task SendNotificationToRoleAsync(string role, string message)
        {
            // Logic để lấy danh sách user theo vai trò
            var usersInRole = await GetUsersInRoleAsync(role);
            foreach (var user in usersInRole)
            {
                await SendNotificationToUserAsync(user.Id, message);
            }
        }
        private async Task<List<AppUser>> GetUsersInRoleAsync(string role)
        {
            throw new NotImplementedException();
        }
    }
}
