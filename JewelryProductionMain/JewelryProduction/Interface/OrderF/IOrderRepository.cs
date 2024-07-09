﻿using JewelryProduction.DTO;
using JewelryProduction.Entities;

namespace JewelryProduction.Interface
{
    public interface IOrderRepository : IRepository<Order>
    {
        string GetManagerIdByOrderId(string orderId);
        Task<Order> GetOrderByIdAsync(string orderId);
        Task<Inspection> GetInspectionAsync(string orderId, string stage);
        Task<List<OrderGetDTO>> GetOrders();
        Task<OrderGetDTO> GetOrder(string id);
        Order GetOrderOnly(string id);
        Task<Dictionary<string, double>> CalculateGoldWeightByTypeInMonthAsync(DateTime startDate, DateTime endDate);
        Task<List<GemstoneWeightDto>> CalculateGemstoneWeightInMonthAsync(DateTime startDate, DateTime endDate);
    }
}

