namespace JewelryProduction.Entities
{
    public class Inspection
    {
        public string InspectionId { get; set; }
        public string? ProductStaffId { get; set;}
        public string Stage { get; set;}
        public DateTime InspectionDate { get; set;}
        public bool? Result { get; set;}
        public string? Comment { get; set;}  
        public string OrderId { get; set;}
        public Order? Order { get; set;}
    }
}
