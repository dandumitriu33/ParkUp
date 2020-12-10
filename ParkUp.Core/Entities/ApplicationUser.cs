using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime DateAdded { get; set; }
        [Column(TypeName = "money")]
        public decimal Credits { get; set; }
    }
}
