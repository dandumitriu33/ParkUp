using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.Models
{
    public class ParkingSpaceRentalDTO
    {
        public int Id { get; set; }
        public int ParkingSpaceId { get; set; }
        public string ParkingSpaceName { get; set; }
        public string OwnerId { get; set; }
        public string OwnerEmail { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public decimal HourlyPrice { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime DateEnded { get; set; }
        public int DurationMinutes { get; set; }
        public decimal AmountPaidByUser { get; set; }
        public decimal AmountReceivedByOwner { get; set; }
    }
}
