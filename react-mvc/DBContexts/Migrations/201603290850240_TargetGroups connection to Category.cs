namespace react_mvc.DBContexts.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TargetGroupsconnectiontoCategory : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CategoryTargetGroups",
                c => new
                    {
                        CategoryDBModelId = c.Int(nullable: false),
                        TargetGroupsDBModelId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.CategoryDBModelId, t.TargetGroupsDBModelId })
                .ForeignKey("dbo.CategoryDBModels", t => t.CategoryDBModelId, cascadeDelete: true)
                .ForeignKey("dbo.TargetGroupsDBModels", t => t.TargetGroupsDBModelId, cascadeDelete: true)
                .Index(t => t.CategoryDBModelId)
                .Index(t => t.TargetGroupsDBModelId);
            
            DropColumn("dbo.CategoryDBModels", "TargetGroup");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CategoryDBModels", "TargetGroup", c => c.String());
            DropForeignKey("dbo.CategoryTargetGroups", "TargetGroupsDBModelId", "dbo.TargetGroupsDBModels");
            DropForeignKey("dbo.CategoryTargetGroups", "CategoryDBModelId", "dbo.CategoryDBModels");
            DropIndex("dbo.CategoryTargetGroups", new[] { "TargetGroupsDBModelId" });
            DropIndex("dbo.CategoryTargetGroups", new[] { "CategoryDBModelId" });
            DropTable("dbo.CategoryTargetGroups");
        }
    }
}
