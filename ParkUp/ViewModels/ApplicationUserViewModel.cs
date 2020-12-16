using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.ViewModels
{
    public class ApplicationUserViewModel
    {
        public string Id { get; set; }
        [Required(ErrorMessage ="The Email Address is required.")]
        [EmailAddress]
        [MaxLength(150)]
        public string Email { get; set; }
        public DateTime DateAdded { get; set; }
        [Column(TypeName = "money")]
        [Range(0, double.MaxValue, ErrorMessage = "Only positive values allowed.")]
        public decimal Credits { get; set; }
        [Required(ErrorMessage = "The First Name is required.")]
        [MaxLength(100)]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "The Last Name is required.")]
        [MaxLength(100)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "The Partner Percentage is required.")]
        [Display(Name = "Partner Percentage (ParkUp share)")]
        [Column(TypeName = "money")]
        [Range(0, 100, ErrorMessage = "The Partner Percentage must be between 0 and 100.")]
        public decimal PartnerPercentage { get; set; }
    }
}
