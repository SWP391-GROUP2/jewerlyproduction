using Firebase.Auth;
using Firebase.Auth.Providers;
using Firebase.Storage;
using JewelryProduction.DbContext;
using JewelryProduction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class _3ddesignController : ControllerBase
    {
        private readonly JewelryProductionContext _context;

        // Configure firebase
        private static string apiKey = "AIzaSyDxAAmlHnqEjvM46OAiEboNxiVJ5eNEhm4";
        private static string Bucket = "jpos-swp391.appspot.com";
        private static string AuthEmail = "swp391@gmail.com";
        private static string AuthPassword = "123456";
        public _3ddesignController(JewelryProductionContext context)
        {
            _context = context;
        }


        //POST: api/_3ddesign/5
        [HttpPost("UploadOnlyImage")]
        public async Task<IActionResult> Index(IFormFile Image)
        {
            var file = Image;
            //FileStream fs;
            //FileStream ms;
            if (file.Length > 0)
            {
                //Upload the file to firebase
                //string foldername = "firebaseFiles";
                //string path = Path.Combine("wwwroot", $"images", file.FileName);
                //ms = new FileStream(Path.Combine(path, file.FileName), FileMode.Open);

                string path = Path.Combine("wwwroot", "images", file.FileName);

                // Tạo một FileStream để đọc file
                using (var fs = new FileStream(path, FileMode.Create))
                {
                    // Copy dữ liệu từ file đã upload vào FileStream
                    await file.CopyToAsync(fs);
                }

                //Firebase uploading stuffs
                var auth = new FirebaseAuthClient(new FirebaseAuthConfig
                {
                    ApiKey = apiKey,
                    AuthDomain = $"jpos-swp391.firebaseapp.com",
                    Providers = new FirebaseAuthProvider[] { new EmailProvider() }
                });

                var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

                // Cancellation token
                var cancellation = new CancellationTokenSource();

                using (var ms = new FileStream(path, FileMode.Open))
                {
                    var task = new FirebaseStorage(
                        Bucket,
                        new FirebaseStorageOptions
                        {
                            AuthTokenAsyncFactory = async () => await a.User.GetIdTokenAsync(),
                            ThrowOnCancel = true,
                        })
                        .Child("images")
                        .Child($"{file.FileName}.{Path.GetExtension(file.FileName).Substring(1)}")
                        .PutAsync(ms, cancellation.Token);
                    task.Progress.ProgressChanged += (s, e) => Console.WriteLine($"Progress: {e.Percentage} %");
                    try
                    {
                        await task;
                        return Ok();
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }
            }
            return BadRequest();
        }



        // GET: api/_3ddesign
        [HttpGet]
        public async Task<ActionResult<IEnumerable<_3ddesign>>> Get_3ddesigns()
        {
            return await _context._3ddesigns.ToListAsync();
        }

        // GET: api/_3ddesign/5
        [HttpGet("{id}")]
        public async Task<ActionResult<_3ddesign>> Get_3ddesign(string id)
        {
            var _3ddesign = await _context._3ddesigns.FindAsync(id);

            if (_3ddesign == null)
            {
                return NotFound();
            }

            return _3ddesign;
        }

        // PUT: api/_3ddesign/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Put_3ddesign(string id, _3ddesignDTO _3ddesignDTO)
        {
            if (id != _3ddesignDTO._3dDesignId)
            {
                return BadRequest();
            }

            var updateDesign = await _context._3ddesigns.FindAsync(id);
            updateDesign.DesignName = _3ddesignDTO.DesignName;
            updateDesign.CustomizeRequestId = _3ddesignDTO.CustomizeRequestId;
            updateDesign.ProductSampleId = _3ddesignDTO.ProductSampleId;
            updateDesign.DesignStaffId = _3ddesignDTO.DesignStaffId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_3ddesignExists(id))
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

        // POST: api/_3ddesign
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Upload")]
        public async Task<ActionResult<_3ddesign>> Post_3ddesign(_3ddesignDTO _3ddesignDTO)
        {
            var _3ddesign = new _3ddesign
            {
                _3dDesignId = _3ddesignDTO._3dDesignId,
                DesignName = _3ddesignDTO.DesignName,
                CustomizeRequestId = _3ddesignDTO.CustomizeRequestId,
                ProductSampleId = _3ddesignDTO.ProductSampleId,
                DesignStaffId = _3ddesignDTO.DesignStaffId,

            };
            //Index(_3ddesignDTO.Image);
            _3ddesign.Image = "";


            //if (_3ddesignDTO.Image.Length > 0)
            //{
            //    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", _3ddesignDTO.Image.FileName);
            //    using (var stream = System.IO.File.Create(path))
            //    {
            //        await _3ddesignDTO.Image.CopyToAsync(stream);
            //    }
            //    _3ddesign.Image = "/images" + _3ddesignDTO.Image.FileName;
            //}
            //else
            //    _3ddesign.Image = "";
            _context._3ddesigns.Add(_3ddesign);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (_3ddesignExists(_3ddesign._3dDesignId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("Get_3ddesign", new { id = _3ddesign._3dDesignId }, _3ddesign);
        }

        // DELETE: api/_3ddesign/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete_3ddesign(string id)
        {
            var _3ddesign = await _context._3ddesigns.FindAsync(id);
            if (_3ddesign == null)
            {
                return NotFound();
            }

            _context._3ddesigns.Remove(_3ddesign);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool _3ddesignExists(string id)
        {
            return _context._3ddesigns.Any(e => e._3dDesignId == id);
        }
    }
}
