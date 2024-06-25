namespace JewelryProduction.Entities
{
    public class ApprovalRequest
    {
        public string ApprovalRequestId { get; set; }
        public string CustomerRequestId { get; set; }
        public decimal Price { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
