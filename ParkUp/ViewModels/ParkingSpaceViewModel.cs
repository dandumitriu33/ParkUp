using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class ParkingSpaceViewModel
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public bool IsApproved { get; set; }
        public string OwnerId { get; set; }
        public string Name { get; set; }
        public string StreetName { get; set; }
        public string Description { get; set; }
        public double HourlyPrice { get; set; }
        public bool IsActive { get; set; } = false;
        public bool IsTaken { get; set; } = false;
        public DateTime DateAdded { get; set; }
    }
}
