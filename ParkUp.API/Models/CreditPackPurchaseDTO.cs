using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.Models
{
    public class CreditPackPurchaseDTO
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public decimal Amount { get; set; }
        public decimal AmountPaid { get; set; }
        public DateTime DateOfPurchase { get; set; }
    }
}
