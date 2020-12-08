using System;
using System.Collections.Generic;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class CityArea
    {
        public int Id { get; set; }
        public int CityId { get; set; }
        public City City { get; set; }
        public int AreaId { get; set; }
        public Area Area { get; set; }
    }
}
