using Newtonsoft.Json;
using react_mvc.DBModels;
using react_mvc.Models;
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
            List<CategoryModel> returnList = new List<CategoryModel>();
            CategoryModel mockData = new CategoryModel()
            {
                Id = 0,
                Name= "Cars",
                Description= "Stuff that you drive around with",
                TargetGroup = new string[] { "Young Adults", "Adults" }
            };
            returnList.Add(mockData);
            return Json(JsonConvert.SerializeObject(returnList), JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddCategory(string name)
        {
            string output = string.IsNullOrEmpty(name) ? "okay" : name;
            return Json(output, JsonRequestBehavior.AllowGet);
        }
    }
}
