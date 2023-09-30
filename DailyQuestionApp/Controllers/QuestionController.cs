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
    public class QuestionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuestionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/questions
        [HttpGet]
        public async Task<IActionResult> GetAllQuestions()
        {
            return Ok(await _context.Questions.ToListAsync());
        }

        // GET: api/questions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question);
        }

        // GET: api/questions/date/{date}
        // date Format: yyyy-MM-dd  example: 2023-09-08
        [HttpGet("date/{date:datetime:regex(\\d{4}-\\d{2}-\\d{2})}")]
        public async Task<IActionResult> GetQuestionByDate(DateTime date)
        {
            var question = await _context.Questions.FirstOrDefaultAsync(q => q.Date.Date == date.Date);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question);
        }


        /*
        // POST: api/questions
        [HttpPost]
        public async Task<IActionResult> CreateQuestion(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestion), new { id = question.Id }, question);
        }
        */

        /*
        // PUT: api/questions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, Question question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Questions.Any(e => e.Id == id))
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
        */


        /*
        // DELETE: api/questions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        */
    }
}
