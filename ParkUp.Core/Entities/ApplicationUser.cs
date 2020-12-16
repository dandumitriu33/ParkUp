using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime DateAdded { get; set; }
        [Column(TypeName = "money")]
        [Range(0, double.MaxValue, ErrorMessage ="Only positive values allowed.")]
        public decimal Credits { get; set; }
        [MaxLength(100)]
        public string FirstName { get; set; }
        [MaxLength(100)]
        public string LastName { get; set; }
        [Column(TypeName = "money")]
        [Range(0, 100)]
        public decimal PartnerPercentage { get; set; } = 30;
    }
}
