using Microsoft.EntityFrameworkCore.Migrations;

namespace ParkUp.Infrastructure.Migrations
{
    public partial class AddParkingSpaceLatLong : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "ParkingSpaces",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "ParkingSpaces",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "ParkingSpaces");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "ParkingSpaces");
        }
    }
}
