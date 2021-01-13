using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.Models
{
    public class ForceFreeParkingSpaceDTO
    {
        public string UserId { get; set; }
        public int ParkingSpaceId { get; set; }
    }
}
