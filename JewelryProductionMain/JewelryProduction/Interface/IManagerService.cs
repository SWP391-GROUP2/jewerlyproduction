using JewelryProduction.Controllers;

namespace JewelryProduction.Interface
{
    public interface IManagerService
    {
        Task AssignProductionStaffAsync(AssignProductionStaffDTO assignProductionStaffDTO);
        Task AssignSaleStaffAsync(AssignSaleStaffDTO assignSaleStaffDTO);
    }
}
