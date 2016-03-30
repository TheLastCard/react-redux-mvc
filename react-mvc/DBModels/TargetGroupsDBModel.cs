using react_mvc.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace react_mvc.DBModels
{
    public class TargetGroupsDBModel
    {
        public TargetGroupsDBModel()
        {
            CategoryDBModels = new HashSet<CategoryDBModel>();
        }

        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int MinAge { get; set; }

        public int MaxAge { get; set; }

        public virtual ICollection<CategoryDBModel> CategoryDBModels { get; set; }

        internal static void OnModelCreating(DbModelBuilder modelBuilder)
        {
            
        }
    }
}
