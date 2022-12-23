using DotNetCoreApp.Database;
using DotNetCoreApp.Helper;
using DotNetCoreApp.Models;
using DotNetCoreApp.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;

namespace DotNetCoreApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IRepository _repository;

        public HomeController(ILogger<HomeController> logger, IRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        public IActionResult Index()
        {
            var userid = Convert.ToInt32(HttpContext.Session.GetString("UserId"));
            var email = HttpContext.Session.GetString("Email");
            ViewBag.Id = userid;
            ViewBag.Email = email;
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public ResponseService GetAllEvents()
        {
            try
            {   var userid = Convert.ToInt32(HttpContext.Session.GetString("UserId"));
                var data = _repository.GetAll<TblSetEvent>(x=>x.UserId==userid);
                var response = data.Select(x => new EventListViewModel
                {
                    EventId = x.EventId,
                    Title = x.Title,
                    Description = x.Descrption,
                    Time = x.Time,

                }).OrderByDescending(x => x.EventId).ToList();
                return new ResponseService(System.Net.HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return new ResponseService(ex);
            }
        }
        [HttpPost]
        public ResponseService AddEvents(EventViewModel request)
        {
            try
            {
                var userid = Convert.ToInt32(HttpContext.Session.GetString("UserId"));
                var e = new TblSetEvent
                {
                    UserId=userid,
                    Title = request.Title,
                    Descrption = request.Description,
                    Time = request.Time,
                    CreatedBy = 1,
                    CreatedOn = DateTime.Now,
                    UpdatedBy = 1,
                    UpdatedOn = DateTime.Now,
                };

                _repository.Add(e);
                _repository.SaveChanges();

                return new ResponseService(code:System.Net.HttpStatusCode.OK, e,message:"Event Added Succesfully..!");

            }
            catch (Exception ex)
            {
                return new ResponseService(ex);
            }

        }
        [HttpGet]
        public ResponseService GetEventById(int id)
        {
            try
            {
                var userid = Convert.ToInt32(HttpContext.Session.GetString("UserId"));
                var data = _repository.Get<TblSetEvent>(x => x.EventId == id && x.UserId==userid);
                if (data != null)
                {
                    var response = new EventEditViewModel
                    {
                        EventId = data.EventId,
                        UserId=userid,
                        Title = data.Title,
                        Description = data.Descrption,
                        Time = data.Time,
                    };
                    return new ResponseService(System.Net.HttpStatusCode.OK, response, "User details!");
                }

                return new ResponseService(System.Net.HttpStatusCode.NotFound,"User not found !");
            }
            catch(Exception ex)
            {
                return new ResponseService(ex);
            }
        }

        [HttpPut]
        public ResponseService UpdateEvents(EventEditViewModel request)
        {
            try
            {
                var userid = Convert.ToInt32(HttpContext.Session.GetString("UserId"));
                var data = _repository.Get<TblSetEvent>(x => x.EventId == request.EventId);
                if(data != null)
                {
                    data.UserId = userid;
                    data.Title = request.Title;
                    data.Descrption = request.Description;
                    data.Time = request.Time;
                    data.CreatedBy = 1;
                    data.CreatedOn = DateTime.Now;
                    data.UpdatedBy = 1;
                    data.UpdatedOn = DateTime.Now;
                    
                    _repository.Update(data);
                    _repository.SaveChanges();
                    return new ResponseService(code:System.Net.HttpStatusCode.OK, data, message:"Event Updated Succesfully..!");
                }

                return new ResponseService(System.Net.HttpStatusCode.BadRequest,"Something went wrong !");

            }
            catch (Exception ex)
            {
                return new ResponseService(ex);
            }

        }

        [HttpGet]
        public ResponseService DeleteEvent(int id)
        {
            try
            {
                var data = _repository.Get<TblSetEvent>(x => x.EventId == id);
                if( data != null)
                {
                    _repository.Delete(data);
                    _repository.SaveChanges();
                    return new ResponseService(System.Net.HttpStatusCode.OK, "Event Deleted Successfully !");
                }

            }
            catch(Exception ex)
            {
                return new ResponseService(ex);
            }
            return new ResponseService(System.Net.HttpStatusCode.NotFound, "Not Found !");
        }
    }
}