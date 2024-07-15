using JewelryProduction.Common;
using JewelryProduction.Interface;
using Microsoft.EntityFrameworkCore;
using JewelryProduction.DbContext;

namespace JewelryProduction.Services
{
    public class InsuranceService : IInsuranceService
    {
        private readonly JewelryProductionContext _context;
        private readonly IInsuranceRepository _insuranceRepository;
        private readonly IOrderRepository _orderRepository;

        public InsuranceService(IInsuranceRepository insuranceRepository, IOrderRepository orderRepository, JewelryProductionContext context)
        {
            _insuranceRepository = insuranceRepository;
            _orderRepository = orderRepository;
            _context = context;
        }

        public async Task<Insurance> CreateInsurance(string orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if (order == null || order.Status != "Shipping")
            {
                throw new Exception("Order not found or payment not completed.");
            }

            var insurance = new Insurance
            {
                InsuranceId = await IdGenerator.GenerateUniqueId<Insurance>(_context, "INS", 4),
                StartDate = DateOnly.FromDateTime(DateTime.Today),
                EndDate = DateOnly.FromDateTime(DateTime.Today.AddYears(1)),
                OrderId = orderId,
                Order = order
            };

            await _insuranceRepository.AddAsync(insurance);
            await _insuranceRepository.SaveChangesAsync();

            return insurance;
        }
        public async Task<IEnumerable<Insurance>> GetAllInsurancesAsync()
        {
            return await _insuranceRepository.GetAllAsync();
        }
        public async Task<Insurance> GetInsuranceByIdAsync(string insuranceId)
        {
            return await _insuranceRepository.GetByIdAsync(insuranceId);
        }
        public async Task<Insurance> UpdateInsuranceAsync(Insurance insurance)
        {
            _insuranceRepository.Update(insurance);
            await _insuranceRepository.SaveChangesAsync();
            return insurance;
        }
    }
}
