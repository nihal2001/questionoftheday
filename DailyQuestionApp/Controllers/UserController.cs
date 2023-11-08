using Microsoft.AspNetCore.Mvc;
using DailyQuestionApp.Models;
using DailyQuestionApp.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DailyQuestionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        // POST: api/users/getOrCreate
        [HttpPost("getOrCreate")]
        public async Task<ActionResult<int>> GetOrCreateUser(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username is required");
            }

            // Attempt to find the user by the provided username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == username);

            if (user == null)
            {

                // User with that username doesn't exist, so create a new one
                user = new User { Name = username };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            return Ok(user.Id);
        }

        // GET: api/users/{id}
        [HttpGet("{{id}}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/users/{id}
        [HttpPut("{{id}}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.Id == id))
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

        // DELETE: api/users/{id}
        [HttpDelete("{{id}}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
