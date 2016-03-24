using Newtonsoft.Json;
using react_mvc.Helpers;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace react_mvc.DBModels
{
    public class CategoryDBModel
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<TargetGroupEnum> TargetGroup { get; set; }
    }
}
