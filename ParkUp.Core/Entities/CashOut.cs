using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class CashOut
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        [Column(TypeName = "money")]
        public decimal UserAvailable { get; set; }
        [Column(TypeName = "money")]
        public decimal Amount { get; set; }
        public DateTime DateSubmitted { get; set; }
        public bool IsApproved { get; set; } = false;
        public string ApprovedByEmail { get; set; }
        public string ApprovedById { get; set; }
    }
}
