using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class CreditPack
    {
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public decimal Amount { get; set; }
    }
}
