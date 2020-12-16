using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.Models
{
    public class AreaDTO
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        public int CityId { get; set; }
    }
}
