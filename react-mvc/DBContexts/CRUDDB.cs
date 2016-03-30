using react_mvc.DBModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace react_mvc.DBContexts
{
    public class CRUDDB : DbContext
    {
        public virtual DbSet<ProductDBModel> Products { get; set; }
        public virtual DbSet<CategoryDBModel> Categories { get; set; }
        public virtual DbSet<TargetGroupsDBModel> TargetGroups { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            CategoryDBModel.OnModelCreating(modelBuilder);
            TargetGroupsDBModel.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CategoryDBModel>()
               .HasMany(s => s.TargetGroups)
               .WithMany(c => c.CategoryDBModels)
               .Map(cs =>
               {
                   cs.MapLeftKey("CategoryDBModelId");
                   cs.MapRightKey("TargetGroupsDBModelId");
                   cs.ToTable("CategoryTargetGroups");
               });
        }
    }
}
