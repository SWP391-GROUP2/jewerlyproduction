using JewelryProduction.Common;

namespace JewelryProduction.DTO
{
    public class OrderPagingRequest : Pagingbase
    {
        public string? Keyword { get; set; }
    }
}
