namespace DailyQuestionApp.Models;
using System.ComponentModel.DataAnnotations;

public class Question
{
    [Key]
    public int Id { get; set; }

    [DataType(DataType.Date)]
    [Required]
    public DateTime Date { get; set; }

    [Required]
    public required string Content { get; set; }

    public ICollection<Answer>? Answers { get; }
}
