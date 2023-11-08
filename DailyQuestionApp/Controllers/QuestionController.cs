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

        [HttpGet("countDate")]
        public IActionResult GetQuestionsByCountFromDate([FromQuery] DateTime date, [FromQuery] int number)
        {
            // Assuming _context is your database context and Question is your entity.
            var questions = _context.Questions
                                    .Where(q => q.Date < date) // Filter questions from this date forward
                                    .OrderByDescending(q => q.Date) // Order by date, most recent first
                                    .Take(number) // Take the specified number of questions
                                    .ToList(); // Execute the query and convert to a list

            if (questions == null || !questions.Any())
            {
                return NotFound("No questions found.");
            }

            return Ok(questions); // Return the questions
        }

        [HttpGet("countId")]
        public IActionResult GetQuestionsByCountFromID([FromQuery] int id, [FromQuery] int number)
        {
            // Assuming _context is your database context and Question is your entity.
            var questions = _context.Questions
                                    .Where(q => q.Id <= id) // Filter questions from this date forward
                                    .OrderByDescending(q => q.Date) // Order by date, most recent first
                                    .Take(number) // Take the specified number of questions
                                    .ToList(); // Execute the query and convert to a list

            if (questions == null || !questions.Any())
            {
                return NotFound("No questions found.");
            }

            return Ok(questions); // Return the questions
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

        // TODO: order by date descending and get first
        // GET: api/questions/latest
        // get latest question
        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestQuestion()
        {
            var question = await _context.Questions.OrderByDescending(q => q.Date).FirstOrDefaultAsync();
            return Ok(question);
        }

        // TODO: Implement function
        // GET: api/questions/user/{userId}
        // get all questions and answers for a user if user has answered
        // ex: { questions: [  { id: 1, date: "10/09/23", question: "hi?", answer: "hi" }, ... ] }
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAllQuestionsForUser(int userId)
        {
            var userQuestions = await (
                from question in _context.Questions
                join answer in _context.Answers on new { QId = question.Id, UId = userId }
                    equals new { QId = answer.QuestionId, UId = answer.UserId } into qaGroup
                from qa in qaGroup.DefaultIfEmpty()
                select new
                {
                    id = question.Id,
                    date = question.Date,
                    question = question.Content,
                    answer = qa == null ? null : qa.ResponseText
                }
            ).ToListAsync();


            if (!userQuestions.Any())
            {
                return NotFound();
            }

            return Ok(new { questions = userQuestions });
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
