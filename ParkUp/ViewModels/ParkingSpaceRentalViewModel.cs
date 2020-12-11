using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class ParkingSpaceRentalViewModel
    {
        public int Id { get; set; }
        public int ParkingSpaceId { get; set; }
        public string ParkingSpaceName { get; set; }
        public string OwnerId { get; set; }
        public string OwnerEmail { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        [Column(TypeName = "money")]
        public decimal HourlyPrice { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime DateEnded { get; set; }
        public int DurationMinutes { get; set; }
        [Column(TypeName = "money")]
        public decimal AmountPaidByUser { get; set; }
        [Column(TypeName = "money")]
        public decimal AmountReceivedByOwner { get; set; }
    }
}
