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
        [HttpGet("{{id}}")]
        public async Task<IActionResult> GetQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question);
        }

        // TODO: order by date descending and get first
        // GET: api/questions/latest
        // get latest question
        // ex: { id: 1, date: "10/09/23", content: "hi?" }
        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestQuestion()
        {
            var question = await _context.Questions.FirstOrDefaultAsync();
            return Ok(question);
        }

        // TODO: Implement function
        // GET: api/questions/user/{userId}
        // get all questions and answers for a user if user has answered
        // ex: { questions: [  { id: 1, date: "10/09/23", question: "hi?", answer: "hi" }, ... ] }
        // [HttpGet("user/{userId}")]
        // public async Task<IActionResult> GetAllQuestionsForUser(int userId)
        // {}

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
