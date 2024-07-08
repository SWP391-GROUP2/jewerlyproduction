namespace JewelryProduction.Entities
{
    public class Notification
    {
        public string NotificationId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string? SenderId { get; set; }
        public string Message { get; set; } = null!;
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public AppUser User { get; set; }
        public AppUser Sender { get; set; }
    }
}
