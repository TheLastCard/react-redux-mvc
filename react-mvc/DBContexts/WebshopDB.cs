using react_mvc.DBModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace react_mvc.DBContexts
{
    public class WebshopDB : DbContext
    {
        public DbSet<ProductDBModel> Products { get; set; }
        public DbSet<CategoryDBModel> Categories { get; set; }
    }
}
