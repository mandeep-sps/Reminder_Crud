using System.ComponentModel.DataAnnotations;

namespace DotNetCoreApp.ViewModels
{
    public class UserViewModel
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; }


        [Required, MaxLength(50)]
        public string LastName { get; set; }


        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        
        [Required]
        public int Gender { get; set; }
        public string GenderNavigation { get; set; }

        [Required, DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long. Contain a Number and a Character.", MinimumLength = 10)]
        public string Password { get; set; }

        [Required]
        public string channelId { get; set; }

    }
    public class UserLoginModel
    {
        public int UserId { get; set; }

        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required, DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long. Contain a Number and a Character.", MinimumLength = 10)]
        public string Password { get; set; }
    }

}
