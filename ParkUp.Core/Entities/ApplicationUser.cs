using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime DateAdded { get; set; }
    }
}
