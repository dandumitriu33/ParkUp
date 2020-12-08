using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.Models
{
    public class AreaDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CityId { get; set; }
    }
}
