using System.ComponentModel.DataAnnotations;

namespace DotNetCoreApp.ViewModels
{
    public class EventViewModel
    {
        //public static int ReminderTime = 30;

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Time { get; set; }
    }
    public class EventListViewModel
    {

        public int EventId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Time { get; set; }

        [Required]
        public string channelId { get; set; }
    }
    public class EventEditViewModel
    {
      
        public int EventId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Time { get; set; }

        [Required]
        public string channelId { get; set; }
    }
}
