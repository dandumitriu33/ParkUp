using Microsoft.AspNetCore.Mvc;
using ParkUp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.Controllers
{
    public class ErrorController : Controller
    {
        [Route("Error/{statusCode}")]
        public IActionResult HttpStatusCodeHandler(int statusCode)
        {
            try
            {
                ViewBag.ErrorCode = $"{statusCode}";
                return View("NotFound");
            }
            catch (Exception ex)
            {
                ErrorViewModel newError = new ErrorViewModel() { ErrorMessage = ex.Message };
                return View("Error", newError);
            }
        }
    }
}
