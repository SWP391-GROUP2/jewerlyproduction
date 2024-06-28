namespace JewelryProduction.Entities
{
    public class Notification
    {
        public string NotificationId { get; set; }
        public string UserId { get; set; }
        public string SenderId { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public AppUser User { get; set; }
        public AppUser Sender { get; set; }
    }
}
