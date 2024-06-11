
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        public OrdersController(JewelryProductionContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(string id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(string id, OrderDTO orderDTO)
        {
            if (id != orderDTO.OrderId)
            {
                return BadRequest();
            }

            var updateOrder = await _context.Orders.FindAsync(id);
            updateOrder.CustomerId = orderDTO.CustomerId;
            updateOrder.SaleStaffId = orderDTO.SaleStaffId;
            updateOrder.ManagerId = orderDTO.ManagerId;
            updateOrder.ProductionStaffId = orderDTO.ProductionStaffId;
            updateOrder.OrderDate = orderDTO.OrderDate;
            updateOrder.DepositAmount = orderDTO.DepositAmount;
            updateOrder.Status = orderDTO.Status;
            updateOrder.ProductSampleId = orderDTO.ProductSampleId;
            updateOrder.CustomizeRequestId = orderDTO.CustomizeRequestId;
            updateOrder.PaymentMethodId = orderDTO.PaymentMethodId;
            updateOrder.TotalPrice = orderDTO.TotalPrice;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderDTO orderDTO)
        {
            var order = new Order
            {
                OrderId = orderDTO.OrderId,
                CustomerId = orderDTO.CustomerId,
                SaleStaffId = orderDTO.SaleStaffId,
                ManagerId = orderDTO.ManagerId,
                ProductionStaffId = orderDTO.ProductionStaffId,
                OrderDate = orderDTO.OrderDate,
                DepositAmount = orderDTO.DepositAmount,
                Status = orderDTO.Status,
                ProductSampleId = orderDTO.ProductSampleId,
                CustomizeRequestId = orderDTO.CustomizeRequestId,
                PaymentMethodId = orderDTO.PaymentMethodId,
                TotalPrice = orderDTO.TotalPrice,
            };
            _context.Orders.Add(order);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrderExists(order.OrderId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }
        [HttpPost]
        public IActionResult PostProductPrice([FromBody] OrderDTO orderDTO, GoldDTO goldDTO, GemstoneDTO gemstoneDTO )
        {
            decimal totalPrice = CalculateProductCost(goldDTO.PricePerGram,goldDTO.Weight,gemstoneDTO.PricePerCarat, gemstoneDTO.CaratWeight);

            // Return a 201 Created response with the updated product price
            return CreatedAtAction(nameof(PostProductPrice), new { id = orderDTO.OrderId }, totalPrice);
        }

    // DELETE: api/Orders/5
    [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }
            public decimal CalculateProductCost(decimal PricePerGram, double GoldWeight, decimal PricePerCarat, double CaratWeight)
            {
                decimal productCost = ((PricePerGram * (decimal)GoldWeight + PricePerCarat *(decimal)CaratWeight) *0.4M)*0.1M;
                return productCost;
            }
        public decimal GetDeposit(decimal productCost)
        {
            decimal deposit = productCost * 0.3M;
            return deposit;
        }
        

        private bool OrderExists(string id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
