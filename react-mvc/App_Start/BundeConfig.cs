using System.Web.Optimization;

namespace react_mvc.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/main.css").Include(
                        "~/css/foundation.css",
                        "~/css/main.css"
                        ));


            bundles.Add(new ScriptBundle("~/bundles/foundation.js").Include(
                        "~/scripts/foundation/vendor/jquery.min.js",
                        "~/scripts/foundation/vendor/what-input.min.js",
                        "~/scripts/foundation/foundation.min.js",
                        "~/scripts/foundation/app.js"
                        ));

            
            bundles.Add(new ScriptBundle("~/bundles/react.js").Include(
                       "~/node_modules/react/dist/react.js",
                       "~/node_modules/react-dom/dist/react-dom.js"
                       ));


        }
    }
}