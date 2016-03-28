using Newtonsoft.Json;
using react_mvc.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace react_mvc.Models
{
    public class TargetGroupsModel
    {
        public TargetGroupsModel Populate(TargetGroupsDBModel model)
        {
            this.Id = model.Id;
            this.Name = model.Name;
            this.MinAge = model.MinAge;
            this.MaxAge = model.MaxAge;
            return this;
        }

        [JsonProperty(PropertyName = "id")]
        public int? Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "minAge")]
        public int MinAge { get; set; }

        [JsonProperty(PropertyName = "maxAge")]
        public int MaxAge { get; set; }
    }
}
