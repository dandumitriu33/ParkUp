using System;
using System.Collections.Generic;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class ParkingSpace
    {
        public int Id { get; set; }
        public string OwnerId { get; set; }
        public string Name { get; set; }
        public string StreetName { get; set; }
        public double HourlyPrice { get; set; }
        public bool IsActive { get; set; } = false;
        public bool IsTaken { get; set; } = false;
        public DateTime DateAdded { get; set; }
        public bool IsRemoved { get; set; } = false;
    }
}
