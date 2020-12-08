using Microsoft.EntityFrameworkCore.Migrations;

namespace ParkUp.Infrastructure.Migrations
{
    public partial class AddAreaParkingSpacesOneToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Areas_Cities_CityId",
                table: "Areas");

            migrationBuilder.AddColumn<int>(
                name: "AreaId",
                table: "ParkingSpaces",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "CityId",
                table: "Areas",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "AreaParkingSpaces",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AreaId = table.Column<int>(nullable: false),
                    ParkingSpaceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AreaParkingSpaces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AreaParkingSpaces_Areas_AreaId",
                        column: x => x.AreaId,
                        principalTable: "Areas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AreaParkingSpaces_ParkingSpaces_ParkingSpaceId",
                        column: x => x.ParkingSpaceId,
                        principalTable: "ParkingSpaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AreaParkingSpaces_AreaId",
                table: "AreaParkingSpaces",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_AreaParkingSpaces_ParkingSpaceId",
                table: "AreaParkingSpaces",
                column: "ParkingSpaceId");

            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Areas_Cities_CityId",
                table: "Areas");

            migrationBuilder.DropTable(
                name: "AreaParkingSpaces");

            migrationBuilder.DropColumn(
                name: "AreaId",
                table: "ParkingSpaces");

            migrationBuilder.AlterColumn<int>(
                name: "CityId",
                table: "Areas",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            
        }
    }
}
