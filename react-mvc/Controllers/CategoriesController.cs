using Newtonsoft.Json;
using NLog;
using react_mvc.DBModels;
using react_mvc.Helpers;
using react_mvc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
                returnList.Add(new CategoryModel().Populate(category));
            }
            Logger.Log(LogLevel.Debug, "GetCategories() ->"+ returnList);
            return Json(JsonConvert.SerializeObject(returnList), JsonRequestBehavior.AllowGet);
        }
    
        public JsonResult CreateCategory(string model)
        {
            CategoryModel newCategory = JsonConvert.DeserializeObject<CategoryModel>(model);
            var newDBCategory = new CategoryDBModel().Populate(newCategory);
            CategoriesCRUD.Add(newDBCategory, true);
            return Json(JsonConvert.SerializeObject( new { id=newDBCategory.Id}), JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateCategory(string model)
        {
            CategoryModel updateCategory = JsonConvert.DeserializeObject<CategoryModel>(model);
            int id = updateCategory.Id == null ? -1 : (int)updateCategory.Id;
            if (updateCategory.Id == -1)
            {
                Json(JsonConvert.SerializeObject(new { status = "Error! Id is missing" }), JsonRequestBehavior.AllowGet);
            }
            var updateDBCategory = CategoriesCRUD.FindById(id);
            if (updateDBCategory == null)
            {
                Json(JsonConvert.SerializeObject(new { status = "Error! Could not find object with that id!" }), JsonRequestBehavior.AllowGet);
            }

            updateDBCategory.Name = updateCategory.Name;
            updateDBCategory.Description = updateCategory.Description;
            updateDBCategory.TargetGroup = string.Join(",",updateCategory.TargetGroup);

            CategoriesCRUD.Commit();
            return Json(JsonConvert.SerializeObject(new { status = "ok" }), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteCategory(int id)
        {
            CategoriesCRUD.Delete(CategoriesCRUD.FindById(id), true);
            return Json(JsonConvert.SerializeObject(new { status = "ok" }), JsonRequestBehavior.AllowGet);
        }
    }
}
