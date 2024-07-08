using JewelryProduction.DbContext;
using Microsoft.AspNetCore.SignalR;

namespace JewelryProduction.Hubs
{

    public class ChatHub : Hub
    {
        private readonly JewelryProductionContext _context;

        public ChatHub(JewelryProductionContext context)
        {
            _context = context;
        }
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
            var mes = new Message
            {
                MessageId = user,
                MessageText = message,
                Timestamp = DateTime.Now,
            };
            _context.Messages.Add(mes);
            await _context.SaveChangesAsync();
        }
    }
}
