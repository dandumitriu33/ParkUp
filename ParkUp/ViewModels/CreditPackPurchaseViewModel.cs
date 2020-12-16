using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class CreditPackPurchaseViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [EmailAddress]
        [MaxLength(150)]
        public string UserEmail { get; set; }
        [Column(TypeName = "money")]
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowded.")]
        public decimal Amount { get; set; }
        [Column(TypeName = "money")]
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowded.")]
        public decimal AmountPaid { get; set; }
        public DateTime DateOfPurchase { get; set; }
    }
}
