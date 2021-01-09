using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.Models
{
    public class CashOutRequestDTO
    {
        public string UserId { get; set; }
        public decimal Amount { get; set; }
    }
}
