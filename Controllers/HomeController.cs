using Microsoft.AspNetCore.Mvc;

namespace GitHubProfileCardApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
