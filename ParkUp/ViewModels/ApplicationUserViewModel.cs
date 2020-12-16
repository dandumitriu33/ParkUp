using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class ApplicationUserViewModel
    {
        public string Id { get; set; }
        [EmailAddress]
        [MaxLength(150)]
        public string Email { get; set; }
        public DateTime DateAdded { get; set; }
        [Column(TypeName = "money")]
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public decimal Credits { get; set; }
        [MaxLength(100)]
        public string FirstName { get; set; }
        [MaxLength(100)]
        public string LastName { get; set; }
        [Column(TypeName = "money")]
        [Range(0, 100)]
        public decimal PartnerPercentage { get; set; }
    }
}
