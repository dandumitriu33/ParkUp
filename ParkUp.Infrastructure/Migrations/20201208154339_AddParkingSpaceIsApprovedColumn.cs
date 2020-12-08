using Microsoft.EntityFrameworkCore.Migrations;

namespace ParkUp.Infrastructure.Migrations
{
    public partial class AddParkingSpaceIsApprovedColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "ParkingSpaces",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "ParkingSpaces");
        }
    }
}
