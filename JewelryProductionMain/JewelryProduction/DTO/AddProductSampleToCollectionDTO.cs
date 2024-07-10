namespace JewelryProduction.DTO
{
    public class AddProductSampleToCollectionDTO
    {
        public string collectionId { get; set; } = null!;
        public List<string> productSampleIds { get; set; } = new List<string>();
    }
}
