using Microsoft.EntityFrameworkCore.Migrations;

namespace ParkUp.Infrastructure.Migrations
{
    public partial class AddParkingSpaceRentalsAdditionalColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerEmail",
                table: "ParkingSpaceRentals",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ParkingSpaceId",
                table: "ParkingSpaceRentals",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ParkingSpaceName",
                table: "ParkingSpaceRentals",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "ParkingSpaceRentals",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerEmail",
                table: "ParkingSpaceRentals");

            migrationBuilder.DropColumn(
                name: "ParkingSpaceId",
                table: "ParkingSpaceRentals");

            migrationBuilder.DropColumn(
                name: "ParkingSpaceName",
                table: "ParkingSpaceRentals");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "ParkingSpaceRentals");
        }
    }
}
