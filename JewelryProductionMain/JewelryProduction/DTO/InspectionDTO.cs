namespace JewelryProduction.DTO
{
    public class InspectionDTO
    {
        public string ProductStaffId { get; set; }
        public string Stage { get; set; }
        public DateTime InspectionDate { get; set; }
        public string Result { get; set; }
        public string Comment { get; set; }
        public string OrderId { get; set; }
    }
}
