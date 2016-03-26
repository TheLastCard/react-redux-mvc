using Newtonsoft.Json;
using NLog;
using react_mvc.DBModels;
using react_mvc.Helpers;
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
        private CRUD<CategoryDBModel> CategoriesCRUD = new CRUD<CategoryDBModel>(new DBContexts.CRUDDB());
        private static Logger Logger = LogManager.GetCurrentClassLogger();

        [HttpGet]
        public JsonResult GetCategories()
        {
            List<CategoryModel> returnList = new List<CategoryModel>();
            foreach (var category in CategoriesCRUD.FindAll())
            {
                returnList.Add(new CategoryModel(category));
            }
            Logger.Log(LogLevel.Debug, "GetCategories() ->"+ returnList);
            return Json(JsonConvert.SerializeObject(returnList), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CreateCategory(string model)
        {
            CategoryModel cat = JsonConvert.DeserializeObject<CategoryModel>(model);
            return Json(cat, JsonRequestBehavior.AllowGet);
        }
    }
}
