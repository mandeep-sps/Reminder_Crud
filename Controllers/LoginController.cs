using DotNetCoreApp.Database;
using DotNetCoreApp.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreApp.Controllers
{
    public class LoginController : Controller
    {
        private readonly IRepository _repository;

        public LoginController(IRepository repository)
        {
            _repository = repository;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ValidateUser(UserLoginModel login)
        {
            var user = _repository.Get<TblUserRegsitration>(x => x.Email == login.Email && x.Password == login.Password);
            if (user != null)
            {
                HttpContext.Session.SetString("UserId", user.UserId.ToString());
                HttpContext.Session.SetString("Email", login.Email);
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ViewBag.error = "InvalidLogin";
            }
            return View("Index");
        }

        [HttpGet]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }
    }
}
