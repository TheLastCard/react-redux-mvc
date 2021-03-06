﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace react_mvc.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public PartialViewResult Categories()
        {
            return PartialView("~/Views/Partials/_CategoriesCRUD.cshtml");
        }

        [HttpGet]
        public PartialViewResult TargetGroups()
        {
            return PartialView("~/Views/Partials/_TargetGroupsCRUD.cshtml");
        }
    }
}