using System;
using System.Collections.Generic;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class AreaParkingSpace
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public Area Area { get; set; }
        public int ParkingSpaceId { get; set; }
        public ParkingSpace ParkingSpace { get; set; }
    }
}
