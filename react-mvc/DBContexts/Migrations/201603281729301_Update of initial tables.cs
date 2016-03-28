namespace react_mvc.DBContexts.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Updateofinitialtables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TargetGroupsDBModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        MinAge = c.Int(nullable: false),
                        MaxAge = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.CategoryDBModels", "TargetGroup", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.CategoryDBModels", "TargetGroup");
            DropTable("dbo.TargetGroupsDBModels");
        }
    }
}
