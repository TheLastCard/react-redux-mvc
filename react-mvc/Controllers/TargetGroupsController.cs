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
    public class TargetGroupsController : Controller
    {
        private CRUD<TargetGroupsDBModel> TargetGroupsCRUD = new CRUD<TargetGroupsDBModel>(new DBContexts.CRUDDB());
        private static Logger Logger = LogManager.GetCurrentClassLogger();

        [HttpGet]
        public JsonResult Read()
        {
            List<TargetGroupsModel> returnList = new List<TargetGroupsModel>();
            foreach (var TargetGroups in TargetGroupsCRUD.FindAll())
            {
                returnList.Add(new TargetGroupsModel().Populate(TargetGroups));
            }
            Logger.Log(LogLevel.Debug, "GetTargetGroups() ->"+ returnList);
            return Json(JsonConvert.SerializeObject(returnList), JsonRequestBehavior.AllowGet);
        }
    
        public JsonResult Create(string model)
        {
            TargetGroupsModel newTargetGroups = JsonConvert.DeserializeObject<TargetGroupsModel>(model);
            var newDBTargetGroups = new TargetGroupsDBModel().Populate(newTargetGroups);
            TargetGroupsCRUD.Add(newDBTargetGroups, true);
            return Json(JsonConvert.SerializeObject( new { id=newDBTargetGroups.Id}), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(string model)
        {
            TargetGroupsModel updateTargetGroups = JsonConvert.DeserializeObject<TargetGroupsModel>(model);
            int id = updateTargetGroups.Id == null ? -1 : (int)updateTargetGroups.Id;
            if (updateTargetGroups.Id == -1)
            {
                Json(JsonConvert.SerializeObject(new { status = "Error! Id is missing" }), JsonRequestBehavior.AllowGet);
            }
            var updateDBTargetGroups = TargetGroupsCRUD.FindById(id);
            if (updateDBTargetGroups == null)
            {
                Json(JsonConvert.SerializeObject(new { status = "Error! Could not find object with that id!" }), JsonRequestBehavior.AllowGet);
            }

            updateDBTargetGroups.Name = updateTargetGroups.Name;
            updateDBTargetGroups.MinAge = updateTargetGroups.MinAge;
            updateDBTargetGroups.MaxAge = updateTargetGroups.MaxAge;

            TargetGroupsCRUD.Commit();
            return Json(JsonConvert.SerializeObject(new { status = "ok" }), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            TargetGroupsCRUD.Delete(TargetGroupsCRUD.FindById(id), true);
            return Json(JsonConvert.SerializeObject(new { status = "ok" }), JsonRequestBehavior.AllowGet);
        }
    }
}
