using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ParkUp.Core.Entities
{
    public class CashOut
    {
        public int Id { get; set; }
        [MaxLength(50)]
        public string UserId { get; set; }
        [EmailAddress]
        [MaxLength(150)]
        public string UserEmail { get; set; }
        [Column(TypeName = "money")]
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public decimal UserAvailable { get; set; }
        [Column(TypeName = "money")]
        [Range(100, double.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public decimal Amount { get; set; }
        public DateTime DateSubmitted { get; set; }
        public bool IsApproved { get; set; } = false;
        [EmailAddress]
        [MaxLength(150)]
        public string ApprovedByEmail { get; set; }
        public string ApprovedById { get; set; }
    }
}
