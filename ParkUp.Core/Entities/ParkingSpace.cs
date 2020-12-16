using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class ParkingSpace
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public bool IsApproved { get; set; } = false;
        public string OwnerId { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(100)]
        public string StreetName { get; set; }
        [MaxLength(100)]
        public string Description { get; set; }
        [Column(TypeName = "money")]
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowded.")]
        public decimal HourlyPrice { get; set; }
        public bool IsActive { get; set; } = false;
        public bool IsTaken { get; set; } = false;
        public DateTime DateAdded { get; set; }
        public bool IsRemoved { get; set; } = false;
        [MaxLength(30)]
        public string GPS { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
