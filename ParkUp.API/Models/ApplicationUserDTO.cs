using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.Models
{
    public class ApplicationUserDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public DateTime DateAdded { get; set; }
        public decimal Credits { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal PartnerPercentage { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
