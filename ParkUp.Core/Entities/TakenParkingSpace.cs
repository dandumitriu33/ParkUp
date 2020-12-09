using System;
using System.Collections.Generic;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class TakenParkingSpace
    {
        public int Id { get; set; }
        public int ParkingSpaceId { get; set; }
        public string UserId { get; set; }
        public DateTime DateStarted { get; set; }
    }
}
