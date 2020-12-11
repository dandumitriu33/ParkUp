using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ParkUp.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ParkUp.Infrastructure.Data
{
    public class ParkUpContext : IdentityDbContext<ApplicationUser>
    {
        public ParkUpContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<City> Cities { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<CityArea> CityAreas { get; set; }
        public DbSet<ParkingSpace> ParkingSpaces { get; set; }
        public DbSet<AreaParkingSpace> AreaParkingSpaces { get; set; }
        public DbSet<TakenParkingSpace> TakenParkingSpaces { get; set; }
        public DbSet<CashOut> CashOuts { get; set; }
        public DbSet<CreditPackPurchase> CreditPackPurchases { get; set; }
        public DbSet<ParkingSpaceRental> ParkingSpaceRentals { get; set; }
    }
}
