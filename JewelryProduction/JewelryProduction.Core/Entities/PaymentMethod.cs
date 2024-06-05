namespace JewelryProduction;

public partial class PaymentMethod
{

    public string PaymentMethodId { get; set; } = null!;

    public string PaymentMethodName { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
