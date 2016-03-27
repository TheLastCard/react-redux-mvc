using Newtonsoft.Json;
using react_mvc.Helpers;
using react_mvc.Models;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;

namespace react_mvc.DBModels
{
    public class CategoryDBModel
    {
        public CategoryDBModel Populate(CategoryModel model)
        {
            this.Name = model.Name;
            this.Description = model.Description;
            this.TargetGroup = string.Join(",", model.TargetGroup);
            return this;
        }

        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string TargetGroup { get; set; }
    }
}
