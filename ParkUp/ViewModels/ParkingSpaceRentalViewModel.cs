using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class ParkingSpaceRentalViewModel
    {
        public int Id { get; set; }
        public int ParkingSpaceId { get; set; }
        [MaxLength(100)]
        public string ParkingSpaceName { get; set; }
        [MaxLength(50)]
        public string OwnerId { get; set; }
        [EmailAddress]
        [MaxLength(150)]
        public string OwnerEmail { get; set; }
        [MaxLength(50)]
        public string UserId { get; set; }
        [EmailAddress]
        [MaxLength(150)]
        public string UserEmail { get; set; }
        [Column(TypeName = "money")]
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public decimal HourlyPrice { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime DateEnded { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public int DurationMinutes { get; set; }
        [Column(TypeName = "money")]
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public decimal AmountPaidByUser { get; set; }
        [Column(TypeName = "money")]
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public decimal AmountReceivedByOwner { get; set; }
    }
}
