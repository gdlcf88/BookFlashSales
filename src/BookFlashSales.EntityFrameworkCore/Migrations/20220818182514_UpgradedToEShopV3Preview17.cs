using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookFlashSales.Migrations
{
    public partial class UpgradedToEShopV3Preview17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductInventoryStrategy",
                table: "EasyAbpEShopOrdersOrderLines",
                type: "integer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductInventoryStrategy",
                table: "EasyAbpEShopOrdersOrderLines");
        }
    }
}
