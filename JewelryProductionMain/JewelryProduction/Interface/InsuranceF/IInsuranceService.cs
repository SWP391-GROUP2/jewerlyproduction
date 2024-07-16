namespace JewelryProduction.Interface;

public interface IInsuranceService
{
    Task<Insurance> CreateInsurance(string orderId);
    Task<Insurance> GetInsuranceByIdAsync(string insuranceId);
    Task<Insurance> UpdateInsuranceAsync(Insurance insurance);
    Task<IEnumerable<Insurance>> GetAllInsurancesAsync();
}
