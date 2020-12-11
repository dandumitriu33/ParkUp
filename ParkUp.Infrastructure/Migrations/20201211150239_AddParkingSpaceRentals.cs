using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ParkUp.Infrastructure.Migrations
{
    public partial class AddParkingSpaceRentals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ParkingSpaceRentals",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    HourlyPrice = table.Column<decimal>(type: "money", nullable: false),
                    DateStarted = table.Column<DateTime>(nullable: false),
                    DateEnded = table.Column<DateTime>(nullable: false),
                    DurationMinutes = table.Column<int>(nullable: false),
                    AmountPaidByUser = table.Column<decimal>(type: "money", nullable: false),
                    AmountReceivedByOwner = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingSpaceRentals", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ParkingSpaceRentals");
        }
    }
}
