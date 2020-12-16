using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class ParkingSpaceViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="The area is required.")]
        public int AreaId { get; set; }
        public bool IsApproved { get; set; }
        public string OwnerId { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage ="The Parking Space Name must be between 1 and 100 characters long.")]
        public string Name { get; set; }
        [Required]
        [MaxLength(100)]
        [Display(Name = "Street Name")]
        public string StreetName { get; set; }
        [Required]
        [MaxLength(100)]
        public string Description { get; set; }
        [Required]
        [Column(TypeName = "money")]
        [Display(Name = "Hourly Price")]
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public decimal HourlyPrice { get; set; }
        public bool IsActive { get; set; } = false;
        public bool IsTaken { get; set; } = false;
        public DateTime DateAdded { get; set; }
        [Required]
        [MaxLength(30)]
        public string GPS { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
