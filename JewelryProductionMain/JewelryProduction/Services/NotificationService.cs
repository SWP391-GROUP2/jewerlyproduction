using JewelryProduction.Common;
using JewelryProduction.DbContext;
using JewelryProduction.Entities;
using JewelryProduction.Interface;
using MailKit.Search;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace JewelryProduction.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<MyHub> _hubContext;
        private readonly JewelryProductionContext _context;
        private readonly UserManager<AppUser> _userManager;

        public NotificationService(IHubContext<MyHub> hubContext, JewelryProductionContext context, UserManager<AppUser> userManager)
        {
            _hubContext = hubContext;
            _context = context;
            _userManager = userManager;
        }

        public async Task SendNotificationToUserfAsync(string user, string senderId, string message)
        {
            var notification = new Notification
            {
                NotificationId = await IdGenerator.GenerateUniqueId<Order>(_context, "Mess", 4),
                UserId = user,
                SenderId = senderId,
                Message = message,
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            // Send real-time notification via SignalR
            await _hubContext.Clients.User(user).SendAsync("ReceiveNotification", message);
        }


        public async Task SendNotificationToRoleAsync(string role, string senderId, string message)
        {
            var usersrole = await _userManager.GetUsersInRoleAsync(role);

            var notifications = usersrole.Select(customer => new Notification
            {
                UserId = customer.Id,
                SenderId = senderId,
                Message = message,
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            _context.Notifications.AddRange(notifications);
            await _context.SaveChangesAsync();

            foreach (var user in usersrole)
            {
                await SendNotificationToUserfAsync(user.Id, senderId, message);
            }
        }
    }
}
