using System;
using System.ComponentModel;

namespace react_mvc.Helpers
{
    public enum TargetGroupEnum
    {
        [Description("Children")]
        Children = 1,
        [Description("Young Adults")]
        YoungAdults = 2,
        [Description("Adults")]
        Adults = 3,
        [Description("Seniors")]
        Seniors = 4
    }
}
