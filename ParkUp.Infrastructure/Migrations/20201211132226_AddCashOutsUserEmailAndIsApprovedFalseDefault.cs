using Microsoft.EntityFrameworkCore.Migrations;

namespace ParkUp.Infrastructure.Migrations
{
    public partial class AddCashOutsUserEmailAndIsApprovedFalseDefault : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "CashOuts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "CashOuts");
        }
    }
}
