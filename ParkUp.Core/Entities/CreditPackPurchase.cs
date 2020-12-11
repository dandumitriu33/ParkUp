using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class CreditPackPurchase
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        [Column(TypeName = "money")]
        public decimal Amount { get; set; }
        [Column(TypeName = "money")]
        public decimal AmountPaid { get; set; }
        public DateTime DateOfPurchase { get; set; }
    }
}
