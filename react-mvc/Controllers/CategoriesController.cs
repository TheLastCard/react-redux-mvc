using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace react_mvc.Controllers
{
    public class CategoriesController : Controller
    {
        [HttpGet]
        public JsonResult GetCategories()
        {
            string output = "okay";
            return Json(output, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddCategory(string name)
        {
            string output = string.IsNullOrEmpty(name) ? "okay" : name;
            return Json(output, JsonRequestBehavior.AllowGet);
        }
    }
}
