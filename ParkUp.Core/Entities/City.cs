using System;
using System.Collections.Generic;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Area> Areas { get; set; }
    }
}
