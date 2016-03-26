using Newtonsoft.Json;
using react_mvc.DBModels;
using react_mvc.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace react_mvc.Models
{
    public class CategoryModel
    {
        public CategoryModel(CategoryDBModel model)
        {
            this.Id = model.Id;
            this.Name = model.Name;
            this.Description = model.Description;
            this.TargetGroup = model.TargetGroup.Select(x => x.ToDescriptionString()).ToArray();
        }

        [JsonProperty(PropertyName = "id")]
        public int? Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "targetGroup")]
        public string[] TargetGroup { get; set; }


    }
}
