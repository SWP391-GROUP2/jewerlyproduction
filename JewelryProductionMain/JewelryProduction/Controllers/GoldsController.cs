using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Xml;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoldsController : ControllerBase
    {
        private readonly JewelryProductionContext _context;
        private static readonly HttpClient client = new HttpClient();
        public GoldsController(JewelryProductionContext context)
        {
            _context = context;
        }


        //public async Task<IActionResult> GetGoldPrice()
        //{
        //    // Lấy token JWT
        //    var client = new RestClient(_tokenUrl);
        //    var tokenRequest = new RestRequest()
        //        .AddHeader("Authorization", $"Bearer {_apiKey}");

        //    var tokenResponse = await client.ExecuteAsync(tokenRequest, Method.Get);

        //    if (!tokenResponse.IsSuccessful)
        //    {
        //        return StatusCode((int)tokenResponse.StatusCode, tokenResponse.StatusDescription);
        //    }

        //    // Giả định phản hồi token có định dạng { "results": "token_value" }
        //    var tokenResult = JsonSerializer.Deserialize<DTO.TokenResponse>(tokenResponse.Content);
        //    var token = tokenResult.results;

        //    // Sử dụng token JWT để yêu cầu dữ liệu giá vàng
        //    var goldClient = new RestClient(_goldPriceUrl);
        //    var goldRequest = new RestRequest()
        //        .AddHeader("Authorization", $"Bearer {token}");

        //    var goldResponse = await goldClient.ExecuteAsync(goldRequest, Method.Get);

        //    if (goldResponse.IsSuccessful)
        //    {
        //        return Ok(goldResponse.Content);
        //    }
        //    else
        //    {
        //        return StatusCode((int)goldResponse.StatusCode, goldResponse.StatusDescription);
        //    }
        //}


        // GET: api/Golds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gold>>> GetGolds()
        {
            return await _context.Golds.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Gold>> GetGold(string id)
        {
            var gold = await _context.Golds.FindAsync(id);

            if (gold == null)
            {
                return NotFound();
            }

            return gold;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutGold(string id, GoldDTO goldDTO)
        {
            if (id != goldDTO.GoldId)
            {
                return BadRequest();
            }

            var updateGold = await _context.Golds.FindAsync(id);
            updateGold.GoldType = goldDTO.GoldType;
            updateGold.Weight = goldDTO.Weight;
            updateGold.PricePerGram = goldDTO.PricePerGram;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoldExists(id))
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

        [HttpPost("RefreshAPI")]
        public async Task<IActionResult> Refresh()
        {

            string connectionString = "Data Source=TONBOOK\\SQLEXPRESS;Initial Catalog=JewelryProduction;Persist Security Info=True;User ID=sa;Password=12345;Trust Server Certificate=True";

            // URL của tệp XML hoặc nguồn dữ liệu XML
            string URL_API = @"https://sjc.com.vn/xml/tygiavang.xml";

            try
            {
                // Tạo đối tượng XmlDocument và tải dữ liệu từ URL_API
                XmlDocument xml = new XmlDocument();
                xml.Load(URL_API);

                // Lấy thông tin cập nhật và đơn vị từ XML
                var updated = DateTime.Parse(xml.SelectSingleNode("/root/ratelist").Attributes["updated"].InnerText).ToString("yyyy-MM-dd HH:mm:ss");
                var unit = xml.SelectSingleNode("/root/ratelist").Attributes["unit"].InnerText;

                // Kết nối đến cơ sở dữ liệu SQL Server
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    // Lấy danh sách các thành phố từ XML
                    var listNode = xml.SelectNodes("/root/ratelist/city");
                    foreach (XmlNode node in listNode)
                    {
                        var nameCity = node.Attributes["name"].InnerText;
                        var childNodeItem = node.ChildNodes;
                        if (childNodeItem.Count > 0)
                        {
                            foreach (XmlNode childNode in childNodeItem)
                            {
                                var buy = childNode.Attributes["buy"].InnerText;
                                var sell = childNode.Attributes["sell"].InnerText;
                                var type = childNode.Attributes["type"].InnerText;

                                // Chuẩn bị câu lệnh INSERT INTO
                                string insertQuery = "INSERT INTO Gold (goldType, pricePerGram)  VALUES (@goldType, @pricePerGram)";

                                // Tạo đối tượng SqlCommand và thiết lập các tham số
                                using (SqlCommand command = new SqlCommand(insertQuery, connection))
                                {
                                    //command.Parameters.AddWithValue("@name", nameCity);
                                    command.Parameters.AddWithValue("@goldType", type);
                                    //command.Parameters.AddWithValue("@buy", double.Parse(buy));
                                    command.Parameters.AddWithValue("@pricePerGram", double.Parse(sell));
                                    //command.Parameters.AddWithValue("@updated", updated);
                                    //command.Parameters.AddWithValue("@unit", unit);

                                    // Thực thi câu lệnh INSERT INTO
                                    command.ExecuteNonQuery();
                                }
                            }
                        }
                    }

                    // Đóng kết nối sau khi hoàn thành
                    connection.Close();
                }

                // Hiển thị thông tin cập nhật và đơn vị (nếu cần)
                Console.WriteLine($"Đơn vị: {unit}");
                Console.WriteLine($"Thời gian cập nhật: {updated}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi xảy ra: {ex.Message}");

            }
            return NoContent();

        }

        [HttpPost]
        public async Task<ActionResult<Gold>> PostGold(GoldDTO goldDTO)
        {
            Gold gold = new Gold
            {
                GoldId = goldDTO.GoldId,
                GoldType = goldDTO.GoldType,
                Weight = goldDTO.Weight,
                PricePerGram = goldDTO.PricePerGram,
            };
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GoldExists(gold.GoldId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGold", new { id = gold.GoldId }, gold);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGold(string id)
        {
            var gold = await _context.Golds.FindAsync(id);
            if (gold == null)
            {
                return NotFound();
            }

            _context.Golds.Remove(gold);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GoldExists(string id)
        {
            return _context.Golds.Any(e => e.GoldId == id);
        }
    }
}
