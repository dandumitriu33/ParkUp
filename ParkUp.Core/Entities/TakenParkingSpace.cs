using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class TakenParkingSpace
    {
        public int Id { get; set; }
        public int ParkingSpaceId { get; set; }
        [MaxLength(50)]
        public string UserId { get; set; }
        public DateTime DateStarted { get; set; }
    }
}
