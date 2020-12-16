using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.Models
{
    public class ParkingSpaceDTO
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public bool IsApproved { get; set; }
        public string OwnerId { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(100)]
        public string StreetName { get; set; }
        [MaxLength(100)]
        public string Description { get; set; }
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public decimal HourlyPrice { get; set; }
        public bool IsActive { get; set; } = false;
        public bool IsTaken { get; set; } = false;
        public DateTime DateAdded { get; set; }
        public DateTime DateStarted { get; set; }
        [MaxLength(30)]
        public string GPS { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
