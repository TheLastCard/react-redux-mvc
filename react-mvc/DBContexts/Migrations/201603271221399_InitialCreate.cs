namespace react_mvc.DBContexts.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CategoryDBModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String()
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Product",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Price = c.Double(nullable: false),
                        Category_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CategoryDBModels", t => t.Category_Id)
                .Index(t => t.Category_Id);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Product", "Category_Id", "dbo.CategoryDBModels");
            DropIndex("dbo.Product", new[] { "Category_Id" });
            DropTable("dbo.Product");
            DropTable("dbo.CategoryDBModels");
        }
    }
}
