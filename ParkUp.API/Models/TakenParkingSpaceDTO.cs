using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.Models
{
    public class TakenParkingSpaceDTO
    {
        public int Id { get; set; }
        public int ParkingSpaceId { get; set; }
        public string UserId { get; set; }
        public DateTime DateStarted { get; set; }
    }
}
