using react_mvc.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace react_mvc.DBModels
{
    public class TargetGroupsDBModel
    {
        public TargetGroupsDBModel Populate(TargetGroupsModel model)
        {
            this.Name = model.Name;
            this.MinAge = model.MinAge;
            this.MaxAge = model.MaxAge;
            return this;
        }

        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int MinAge { get; set; }

        public int MaxAge { get; set; }
    }
}
