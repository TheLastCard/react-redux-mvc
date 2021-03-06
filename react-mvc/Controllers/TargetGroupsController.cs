﻿using Newtonsoft.Json;
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
    public class TargetGroupsController : Controller
    {
        private readonly CRUD<TargetGroupsDBModel> TargetGroupsCRUD;
        private readonly Logger Logger;
        public TargetGroupsController()
        {
            TargetGroupsCRUD = new CRUD<TargetGroupsDBModel>(new DBContexts.CRUDDB());
            Logger = LogManager.GetCurrentClassLogger();
        }
        
        [HttpGet]
        [OutputCache(Duration = 7200, Location = OutputCacheLocation.Server)]
        public JsonResult Read()
        {
            List<TargetGroupsModel> returnList = new List<TargetGroupsModel>();
            foreach (var TargetGroups in TargetGroupsCRUD.FindAll())
            {
                returnList.Add(CreateTargetGroupsModel(TargetGroups));
            }
            Logger.Log(LogLevel.Debug, "GetTargetGroups() ->"+ returnList);
            return Json(JsonConvert.SerializeObject(returnList), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create(string model)
        {
            TargetGroupsModel newTargetGroups = JsonConvert.DeserializeObject<TargetGroupsModel>(model);
            var newDBTargetGroups = CreateTargetGroupsDBModel(newTargetGroups);
            TargetGroupsCRUD.Add(newDBTargetGroups, true);
            ClearReadCache();
            return Json(JsonConvert.SerializeObject( new { id=newDBTargetGroups.Id}), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
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
            ClearReadCache();
            return Json(JsonConvert.SerializeObject(new { status = "ok" }), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Delete(int id)
        {
            TargetGroupsCRUD.Delete(TargetGroupsCRUD.FindById(id), true);
            ClearReadCache();
            return Json(JsonConvert.SerializeObject(new { status = "ok" }), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Duration = 7200, Location = OutputCacheLocation.Server)]
        public JsonResult ReadTargetGroupsAsArray()
        {
            List<object> result = new List<object>();
            foreach(var tg in TargetGroupsCRUD.FindAll())
            {
                result.Add(new { name= tg.Name });
            }
            return Json(JsonConvert.SerializeObject(result), JsonRequestBehavior.AllowGet);
        }

        private TargetGroupsDBModel CreateTargetGroupsDBModel(TargetGroupsModel model)
        {
            var dbModel = new TargetGroupsDBModel();
            dbModel.Name = model.Name;
            dbModel.MaxAge = model.MaxAge;
            dbModel.MinAge = model.MinAge;
            return dbModel;
        }

        private TargetGroupsModel CreateTargetGroupsModel(TargetGroupsDBModel model)
        {
            var viewModel = new TargetGroupsModel();
            viewModel.Id = model.Id;
            viewModel.Name = model.Name;
            viewModel.MaxAge = model.MaxAge;
            viewModel.MinAge = model.MinAge;
            return viewModel;
        }

        private void ClearReadCache()
        {
            Response.RemoveOutputCacheItem(Url.Action("Read"));
            Response.RemoveOutputCacheItem(Url.Action("ReadTargetGroupsAsArray"));
        }
    }
}
