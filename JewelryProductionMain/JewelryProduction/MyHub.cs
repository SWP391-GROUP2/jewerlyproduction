    using Microsoft.AspNetCore.SignalR;
    using System.Collections.Concurrent;

    namespace JewelryProduction
    {
        public class MyHub : Hub
        {
            private static readonly ConcurrentDictionary<string, string> UserConnections = new ConcurrentDictionary<string, string>();

            public override Task OnConnectedAsync()
            {
                var userId = Context.UserIdentifier;
                if (!string.IsNullOrEmpty(userId))
                {
                    UserConnections[userId] = Context.ConnectionId;
                }

                return base.OnConnectedAsync();
            }

            public override Task OnDisconnectedAsync(Exception? exception)
            {
                var userId = Context.UserIdentifier;
                if (!string.IsNullOrEmpty(userId))
                {
                    UserConnections.TryRemove(userId, out _);
                }

                return base.OnDisconnectedAsync(exception);
            }

            public static string GetConnectionId(string userId)
            {
                UserConnections.TryGetValue(userId, out var connectionId);
                return connectionId;
            }
        }
    }
