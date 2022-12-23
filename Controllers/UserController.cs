using DotNetCoreApp.Database;
using DotNetCoreApp.Helper;
using DotNetCoreApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreApp.Controllers
{
    public class UserController : Controller
    {
        private readonly IRepository _repository;

        public UserController(IRepository repository)
        {
            _repository = repository;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetGenders()
        {
            var gender = _repository.GetAll<TblGender>().Select(x => new DropDownViewModel
            {
                Id = x.GenderId,
                Name = x.Gender

            }).ToList();

            return Json(gender);
        }

        [HttpPost]
        public ResponseService AddUser(UserViewModel request)
        {
            try 
            {
                //var message = string.Empty;
                var IsEmailExist = (_repository.Get<TblUserRegsitration>(x => x.Email == request.Email)) != null;
                if (IsEmailExist)
                    return new ResponseService(null,"Email Id already exist!", true);

                var user = new TblUserRegsitration
                    {
                        FirstName = request.FirstName,
                        LastName = request.LastName,
                        Email = request.Email,
                        Gender = request.Gender,
                        Password = request.Password,
                        CreatedBy = 1,
                        CreatedOn = DateTime.Now,
                        UpdatedBy = 1,
                        UpdatedOn = DateTime.Now,
                    };

                    _repository.Add(user);
                _repository.SaveChanges();
                return new ResponseService(code:System.Net.HttpStatusCode.OK, user,message: "User Registered Succesfully..!");
                
            }
            catch (Exception ex)
            {
                return new ResponseService(ex);
            }


        }

    }
}
