using Newtonsoft.Json;
using react_mvc.Helpers;
using react_mvc.Models;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;
using System.Data.Entity;

namespace react_mvc.DBModels
{
    public class CategoryDBModel
    {
        public CategoryDBModel()
        {
            TargetGroups = new HashSet<TargetGroupsDBModel>();
        }

        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public virtual ICollection<TargetGroupsDBModel> TargetGroups { get; set; }

        internal static void OnModelCreating(DbModelBuilder modelBuilder)
        {

        }

    }
}
