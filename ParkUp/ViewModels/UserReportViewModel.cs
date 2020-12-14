using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class UserReportViewModel
    {
        public ApplicationUserViewModel AppUser { get; set; }
        public List<ParkingSpaceViewModel> ParkingSpaces { get; set; }
        public List<ParkingSpaceRentalViewModel> TransactionHistory { get; set; }
        public List<CashOutViewModel> CashOuts { get; set; }
        public int DaysJoined { get; set; }
        public decimal LifetimeGeneratedSales { get; set; }
        public decimal LifetimeProfitGenerated { get; set; }
        public decimal LifeTimeCashOut { get; set; }
        public decimal MonthlyAverageSales { get; set; }
        public decimal AverageCashOut { get; set; }
    }
}
