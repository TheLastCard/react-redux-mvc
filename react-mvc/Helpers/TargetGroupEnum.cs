using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace react_mvc.Helpers
{
    public enum TargetGroupEnum
    {
        [Description("Id")]
        Id = 1,
        [Description("Name")]
        Name = 2,
        [Description("Description")]
        Description = 3,
        [Description("TargetGroup")]
        TargetGroup = 4
    }

    public static class TargetGroupEnumExtension
    {
        public static string ToDescriptionString(this TargetGroupEnum val)
        {
            DescriptionAttribute[] attributes = (DescriptionAttribute[])val.GetType().GetField(val.ToString()).GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attributes.Length > 0 ? attributes[0].Description : string.Empty;
        }
    }
}
