using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class Area
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        public int CityId { get; set; }
    }
}
