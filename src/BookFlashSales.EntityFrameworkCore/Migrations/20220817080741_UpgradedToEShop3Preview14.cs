using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookFlashSales.Migrations
{
    public partial class UpgradedToEShop3Preview14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ReducedInventoryTime",
                table: "EasyAbpEShopPluginsFlashSalesFlashSaleResults",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReducedInventoryTime",
                table: "EasyAbpEShopPluginsFlashSalesFlashSaleResults");
        }
    }
}
