using Microsoft.EntityFrameworkCore.Migrations;

namespace ParkUp.Infrastructure.Migrations
{
    public partial class SwitchPartnerPercentageToDecimal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "PartnerPercentage",
                table: "AspNetUsers",
                type: "money",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PartnerPercentage",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "money");
        }
    }
}
