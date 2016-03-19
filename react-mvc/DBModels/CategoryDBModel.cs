using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace react_mvc.DBModels
{
    public class CategoryDBModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
