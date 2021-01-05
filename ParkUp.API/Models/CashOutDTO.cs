using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.Models
{
    public class CashOutDTO
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public decimal UserAvailable { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateSubmitted { get; set; }
        public bool IsApproved { get; set; } = false;
        public string ApprovedByEmail { get; set; }
        public string ApprovedById { get; set; }
    }
}
