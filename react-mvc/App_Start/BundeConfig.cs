using System.Web.Optimization;

namespace react_mvc.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/main.css").Include(
                        "~/css/foundation.css"
                        ));

            
            bundles.Add(new ScriptBundle("~/bundles/foundation.js").Include(
                        "~/scripts/foundation/vendor/jquery.min.js",
                        "~/scripts/foundation/vendor/what-input.min.js",
                        "~/scripts/foundation/foundation.min.js",
                        "~/scripts/foundation/app.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/react.js").Include(
                       "~/scripts/require.js",
                       "~/scripts/react/react-0.14.7.js",
                       "~/scripts/react/react-dom-0.14.7.js",
                       "~/scripts/showdown.min.js",
                       "~/node_modules/redux/dist/redux.js",
                       "~/node_modules/react-redux/dist/react-redux.js"
                       ));


        }
    }
}