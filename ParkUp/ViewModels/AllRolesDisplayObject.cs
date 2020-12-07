using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class AllRolesDisplayObject
    {
        public IEnumerable<IdentityRole> Roles { get; set; }
        public Dictionary<string, List<string>> UserLists { get; set; }
    }
}
