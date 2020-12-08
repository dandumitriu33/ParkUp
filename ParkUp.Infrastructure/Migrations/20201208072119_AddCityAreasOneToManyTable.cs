using Microsoft.EntityFrameworkCore.Migrations;

namespace ParkUp.Infrastructure.Migrations
{
    public partial class AddCityAreasOneToManyTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CityAreas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CityId = table.Column<int>(nullable: false),
                    AreaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CityAreas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CityAreas_Areas_AreaId",
                        column: x => x.AreaId,
                        principalTable: "Areas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CityAreas_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CityAreas_AreaId",
                table: "CityAreas",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_CityAreas_CityId",
                table: "CityAreas",
                column: "CityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CityAreas");
        }
    }
}
