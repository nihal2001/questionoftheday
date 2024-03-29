namespace DailyQuestionApp.Models;
using System.ComponentModel.DataAnnotations;


public class User
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public ICollection<Answer> Answers { get; set; } 
}
