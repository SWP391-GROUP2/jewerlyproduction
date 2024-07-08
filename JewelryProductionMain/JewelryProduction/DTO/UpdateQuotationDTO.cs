namespace JewelryProduction.DTO
{
    public class UpdateQuotationDTO
    {
        public string CustomerRequestId { get; set; }
        public decimal NewQuotation { get; set; }
        public string NewQuotationDes { get; set; }
    }
}
