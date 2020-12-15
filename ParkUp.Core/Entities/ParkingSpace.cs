using System;
using System.Collections.Generic;
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
        public string Name { get; set; }
        public string StreetName { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "money")]
        public decimal HourlyPrice { get; set; }
        public bool IsActive { get; set; } = false;
        public bool IsTaken { get; set; } = false;
        public DateTime DateAdded { get; set; }
        public bool IsRemoved { get; set; } = false;
        public string GPS { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
