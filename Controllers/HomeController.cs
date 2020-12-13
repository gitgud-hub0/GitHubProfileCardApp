using System.Collections.Generic;
using GitHubProfileCardApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace GitHubProfileCardApp.Controllers
{
    public class HomeController : Controller
    {
        private IList<ProfileCardModel> _testProfileCards;

        public HomeController()
        {
            _testProfileCards = new List<ProfileCardModel>
            {
                new ProfileCardModel()
                {
                    Name = "Dan Abramov",
                    AvatarUrl = "https://avatars0.githubusercontent.com/u/810438?v=4",
                    Company = "@facebook"
                },                
                new ProfileCardModel()
                {
                    Name = "Sophie Alpert",
                    AvatarUrl = "https://avatars2.githubusercontent.com/u/6820?v=4",
                    Company = "Humu"
                },                
                new ProfileCardModel()
                {
                    Name = "Sebastian Markbåge",
                    AvatarUrl = "https://avatars2.githubusercontent.com/u/63648?v=4",
                    Company = "Facebook"
                }
            };
        }
        //The Route attribute specifies that this action should be used when /profilecards is loaded. This method of defining URL routes is known as "attribute routing".
        //ResponseCache, When designing a real world API, caching of API requests should be considered more carefully
        [Route("profilecards")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public ActionResult ProfileCards()
        {
            return Json(_testProfileCards);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
