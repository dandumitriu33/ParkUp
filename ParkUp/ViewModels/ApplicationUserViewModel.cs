using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class ApplicationUserViewModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public DateTime DateAdded { get; set; }
        [Column(TypeName = "money")]
        public decimal Credits { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Column(TypeName = "money")]
        public decimal PartnerPercentage { get; set; }
    }
}
