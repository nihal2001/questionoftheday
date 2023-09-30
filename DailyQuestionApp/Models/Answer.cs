namespace DailyQuestionApp.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Answer
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey("Question")]
    public int QuestionId { get; set; }

    [Required]
    [ForeignKey("User")]
    public int UserId { get; set; }

    [Required]
    public string? ResponseText { get; set; }
}
