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
using System.Web.UI;

namespace react_mvc.Controllers
{
    public class CategoriesController : Controller
    {
        private readonly CRUD<CategoryDBModel> CategoriesCRUD;
        private readonly CRUD<TargetGroupsDBModel> TargetGroupsCRUD;
        private readonly Logger Logger;

        public CategoriesController()
        {
            var db = new DBContexts.CRUDDB();
            CategoriesCRUD = new CRUD<CategoryDBModel>(db);
            TargetGroupsCRUD = new CRUD<TargetGroupsDBModel>(db);
            Logger = LogManager.GetCurrentClassLogger();
        }

        [HttpGet]
        [OutputCache(Duration = 7200, Location = OutputCacheLocation.Server)]
        public JsonResult Read()
        {
            List<CategoryModel> returnList = new List<CategoryModel>();
            var categories = CategoriesCRUD.FindAll();
            foreach (var category in categories.ToList())
            {
                returnList.Add(CreateCategoryModel(category));
            }
            Logger.Log(LogLevel.Debug, "GetCategories() ->"+ returnList);
            return Json(JsonConvert.SerializeObject(returnList), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create(string model)
        {
            CategoryModel newCategory = JsonConvert.DeserializeObject<CategoryModel>(model);
            var newDBCategory = CreateCategoryDBModel(newCategory);
            CategoriesCRUD.Add(newDBCategory, true);
            ClearReadCache();
            return Json(JsonConvert.SerializeObject( new { id=newDBCategory.Id}), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Update(string model)
        {
            CategoryModel modelIn = JsonConvert.DeserializeObject<CategoryModel>(model);
            int id = modelIn.Id == null ? -1 : (int)modelIn.Id;
            if (modelIn.Id == -1)
            {
                Json(JsonConvert.SerializeObject(new { status = "Error! Id is missing" }), JsonRequestBehavior.AllowGet);
            }
            var updateDBCategory = CategoriesCRUD.FindById(id);
            if (updateDBCategory == null)
            {
                Json(JsonConvert.SerializeObject(new { status = "Error! Could not find object with that id!" }), JsonRequestBehavior.AllowGet);
            }

            updateDBCategory.Name = modelIn.Name;
            updateDBCategory.Description = modelIn.Description;

            var newTargetGroups = TargetGroupsCRUD.FindAll().Where(x => modelIn.TargetGroup.Contains(x.Name)).ToList();
            foreach(var tg in updateDBCategory.TargetGroups.ToList())
            {
                updateDBCategory.TargetGroups.Remove(tg);
            }
            foreach (var tg in newTargetGroups.Except(updateDBCategory.TargetGroups.ToList()))
            {
                updateDBCategory.TargetGroups.Add(tg);
            }

            CategoriesCRUD.Commit();
            ClearReadCache();
            return Json(JsonConvert.SerializeObject(new { status = "ok" }), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Delete(int id)
        {
            CategoriesCRUD.Delete(CategoriesCRUD.FindById(id), true);
            ClearReadCache();
            return Json(JsonConvert.SerializeObject(new { status = "ok" }), JsonRequestBehavior.AllowGet);
        }

        private CategoryDBModel CreateCategoryDBModel(CategoryModel model)
        {
            var dbModel = new CategoryDBModel();
            dbModel.Name = model.Name;
            dbModel.Description = model.Description;
            dbModel.TargetGroups = TargetGroupsCRUD.FindAll().Where(x => model.TargetGroup.Any(z => z == x.Name)).ToList();
            return dbModel;
        }

        private CategoryModel CreateCategoryModel(CategoryDBModel model)
        {
            var viewModel = new CategoryModel();
            viewModel.Id = model.Id;
            viewModel.Name = model.Name;
            viewModel.Description = model.Description;
            viewModel.TargetGroup = model.TargetGroups.Select(x => x.Name).ToList();
            return viewModel;
        }

        private void ClearReadCache()
        {
            Response.RemoveOutputCacheItem(Url.Action("Read"));
        }
    }
}
