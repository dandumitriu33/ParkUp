using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkUp.Infrastructure.Data
{
    public class EFRepository : IAsyncRepository
    {
        private readonly ParkUpContext _dbContext;

        public EFRepository(ParkUpContext context)
        {
            _dbContext = context;
        }

        public async Task<List<City>> GetAllCities()
        {
            return await _dbContext.Cities.ToListAsync();
        }

        public async Task<City> AddCity(City city)
        {
            await _dbContext.Cities.AddAsync(city);
            await _dbContext.SaveChangesAsync();
            return city;
        }

        public async Task<List<Area>> GetAllAreas()
        {
            return await _dbContext.Areas.ToListAsync();
        }

        public async Task<Area> AddArea(Area area)
        {
            await _dbContext.Areas.AddAsync(area);
            await _dbContext.SaveChangesAsync();
            return area;
        }

        public async Task<CityArea> AddCityArea(CityArea cityArea)
        {
            await _dbContext.CityAreas.AddAsync(cityArea);
            await _dbContext.SaveChangesAsync();
            return cityArea;
        }

        public async Task<List<Area>> GetAllAreasForCity(int cityId)
        {
            return await _dbContext.Areas.Where(a => a.CityId == cityId).OrderBy(a => a.Name).ToListAsync();
        }

        public async Task<List<ParkingSpace>> GetAllOwnerParkingSpaces(string userId)
        {
            return await _dbContext.ParkingSpaces
                    .Where(ps => ps.OwnerId == userId && ps.IsRemoved == false)
                    .OrderByDescending(ps => ps.Id)
                    .ToListAsync();
        }

        public async Task<List<ParkingSpace>> GetParkingSpacesForOwnerId(string userId, int areaId, string searchPhrase="")
        {
            if (String.IsNullOrEmpty(searchPhrase) == true)
            {
                return await _dbContext.ParkingSpaces
                    .Where(ps => ps.OwnerId == userId && ps.AreaId == areaId && ps.IsRemoved == false)
                    .OrderBy(ps => ps.Name)
                    .ToListAsync();
            }
            return await _dbContext.ParkingSpaces
                .Where(ps => ps.OwnerId == userId 
                        && ps.AreaId == areaId 
                        && ps.IsRemoved == false 
                        && (ps.Name.Contains(searchPhrase) 
                                || ps.Description.Contains(searchPhrase) 
                                || ps.StreetName.Contains(searchPhrase)))
                .OrderBy(ps => ps.Name)
                .ToListAsync();
        }

        public async Task<List<ParkingSpace>> GetAllParkingSpaces()
        {
            return await _dbContext.ParkingSpaces.Where(ps => ps.IsRemoved == false).OrderByDescending(ps => ps.DateAdded).ToListAsync();
        }

        public async Task<List<ParkingSpace>> GetAllParkingSpacesForArea(int areaId, string searchPhrase="")
        {
            if (String.IsNullOrEmpty(searchPhrase) == true)
            {
                return await _dbContext.ParkingSpaces
                .Where(ps => ps.AreaId == areaId && ps.IsRemoved == false)
                .OrderBy(ps => ps.HourlyPrice)
                .ToListAsync();
            }
            return await _dbContext.ParkingSpaces
                .Where(ps => ps.AreaId == areaId 
                        && ps.IsRemoved == false 
                        && (ps.Name.Contains(searchPhrase) 
                                || ps.Description.Contains(searchPhrase) 
                                || ps.StreetName.Contains(searchPhrase)))
                .OrderBy(ps => ps.HourlyPrice)
                .ToListAsync();
        }

        public async Task<List<ParkingSpace>> GetAllNearbyParkingSpaces(double latitude, double longitude)
        {
            return await _dbContext.ParkingSpaces.Where(ps => ps.IsRemoved == false
                                                              && ps.IsTaken == false
                                                              && Math.Abs(ps.Latitude - latitude) < 0.01
                                                              && Math.Abs(ps.Longitude - longitude) < 0.01)
                                                 .OrderBy(ps => ps.HourlyPrice)
                                                 .ToListAsync();
            //if (String.IsNullOrEmpty(searchPhrase) == true)
            //{
            //    return await _dbContext.ParkingSpaces
            //    .Where(ps => ps.AreaId == areaId && ps.IsRemoved == false)
            //    .OrderBy(ps => ps.HourlyPrice)
            //    .ToListAsync();
            //}
            //return await _dbContext.ParkingSpaces
            //    .Where(ps => ps.AreaId == areaId
            //            && ps.IsRemoved == false
            //            && (ps.Name.Contains(searchPhrase)
            //                    || ps.Description.Contains(searchPhrase)
            //                    || ps.StreetName.Contains(searchPhrase)))
            //    .OrderBy(ps => ps.HourlyPrice)
            //    .ToListAsync();
        }

        public async Task<List<ParkingSpace>> GetParkingSpacesByOwnerId(string ownerId)
        {
            return await _dbContext.ParkingSpaces.Where(ps => ps.OwnerId == ownerId && ps.IsRemoved == false).OrderByDescending(ps => ps.DateAdded).ToListAsync();
        }

        public async Task<ParkingSpace> GetParkingSpaceById(int parkingSpaceId)
        {
            return await _dbContext.ParkingSpaces.Where(ps => ps.Id == parkingSpaceId).FirstOrDefaultAsync();
        }
                
        public async Task<ParkingSpace> EditParkingSpace(ParkingSpace parkingSpace)
        {
            ParkingSpace parkingSpaceFromDb = await _dbContext.ParkingSpaces.Where(ps => ps.Id == parkingSpace.Id).FirstOrDefaultAsync();
            parkingSpaceFromDb.Name = parkingSpace.Name;
            parkingSpaceFromDb.StreetName = parkingSpace.StreetName;
            parkingSpaceFromDb.Description = parkingSpace.Description;
            parkingSpaceFromDb.HourlyPrice = parkingSpace.HourlyPrice;
            
            _dbContext.ParkingSpaces.Attach(parkingSpaceFromDb);
            _dbContext.Entry(parkingSpaceFromDb).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return parkingSpaceFromDb;
        }

        public async Task<ParkingSpace> RemoveParkingSpaceById(int parkingSpaceId)
        {
            ParkingSpace parkingSpaceFromDb = await _dbContext.ParkingSpaces.Where(ps => ps.Id == parkingSpaceId).FirstOrDefaultAsync();
            parkingSpaceFromDb.IsRemoved = true;

            _dbContext.ParkingSpaces.Attach(parkingSpaceFromDb);
            _dbContext.Entry(parkingSpaceFromDb).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return parkingSpaceFromDb;
        }

        public async Task TakeParkingSpace(TakenParkingSpace takenParkingSpace)
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var parkingSpace = await _dbContext.ParkingSpaces.Where(ps => ps.Id == takenParkingSpace.ParkingSpaceId && ps.IsTaken == false && ps.IsRemoved == false)
                                                                 .FirstOrDefaultAsync();
                parkingSpace.IsTaken = true;
                _dbContext.ParkingSpaces.Attach(parkingSpace);
                _dbContext.Entry(parkingSpace).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                await _dbContext.TakenParkingSpaces.AddAsync(takenParkingSpace);
                await _dbContext.SaveChangesAsync();
                
                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
        }

        public async Task LeaveParkingSpace(TakenParkingSpace takenParkingSpace)
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var parkingSpaceFromDb = await _dbContext.ParkingSpaces.Where(ps => ps.Id == takenParkingSpace.ParkingSpaceId && ps.IsTaken == true && ps.IsRemoved == false)
                                                                 .FirstOrDefaultAsync();
                var takenParkingSpaceInstanceFromDb = await _dbContext.TakenParkingSpaces.Where(tps => tps.ParkingSpaceId == takenParkingSpace.ParkingSpaceId &&
                                                                                                        tps.UserId == takenParkingSpace.UserId)
                                                                                         .FirstOrDefaultAsync();
                
                // payment calculation and transfer
                DateTime start = takenParkingSpaceInstanceFromDb.DateStarted;
                DateTime end = DateTime.Now;
                TimeSpan duration = end.Subtract(start);
                // formula for charging half the hourly price every 30 min period has started
                var payment = (decimal) Math.Ceiling(duration.TotalMinutes / 30) * (parkingSpaceFromDb.HourlyPrice/2);

                var userFromDb = await _dbContext.Users.Where(u => u.Id == takenParkingSpace.UserId).FirstOrDefaultAsync();
                userFromDb.Credits -= payment;
                _dbContext.Users.Attach(userFromDb);
                _dbContext.Entry(userFromDb).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                var ownerFromDb = await _dbContext.Users.Where(u => u.Id == parkingSpaceFromDb.OwnerId).FirstOrDefaultAsync();
                decimal partnerPercentage = ownerFromDb.PartnerPercentage;
                decimal ownerIncome = ((100 - partnerPercentage)/100)*payment;
                ownerFromDb.Credits += ownerIncome;
                _dbContext.Users.Attach(ownerFromDb);
                _dbContext.Entry(ownerFromDb).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                // freeing up the space
                parkingSpaceFromDb.IsTaken = false;
                _dbContext.ParkingSpaces.Attach(parkingSpaceFromDb);
                _dbContext.Entry(parkingSpaceFromDb).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                // removing the taken instance
                _dbContext.TakenParkingSpaces.Remove(takenParkingSpaceInstanceFromDb);
                await _dbContext.SaveChangesAsync();

                // adding instance of ParkingSpaceRental transaction
                ParkingSpaceRental newParkingSpaceRental = new ParkingSpaceRental();
                newParkingSpaceRental.ParkingSpaceId = parkingSpaceFromDb.Id;
                newParkingSpaceRental.ParkingSpaceName = parkingSpaceFromDb.Name;
                newParkingSpaceRental.HourlyPrice = parkingSpaceFromDb.HourlyPrice;
                newParkingSpaceRental.OwnerId = parkingSpaceFromDb.OwnerId;
                newParkingSpaceRental.OwnerEmail = ownerFromDb.Email;
                newParkingSpaceRental.UserId = userFromDb.Id;
                newParkingSpaceRental.UserEmail = userFromDb.Email;
                newParkingSpaceRental.DateStarted = start;
                newParkingSpaceRental.DateEnded = end;
                newParkingSpaceRental.DurationMinutes = (int) duration.TotalMinutes;
                newParkingSpaceRental.AmountPaidByUser = payment;
                newParkingSpaceRental.AmountReceivedByOwner = ownerIncome;
                await _dbContext.ParkingSpaceRentals.AddAsync(newParkingSpaceRental);
                await _dbContext.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
        }

        public async Task<List<TakenParkingSpace>> GetTakenInstancesByUserId(string userId)
        {
            return await _dbContext.TakenParkingSpaces.Where(tps => tps.UserId == userId)
                                                      .OrderByDescending(tps => tps.DateStarted)
                                                      .ToListAsync();
        }

        public async Task<TakenParkingSpace> GetTakenInstanceByParkingSpaceId(int parkingSpaceId) 
        {
            return await _dbContext.TakenParkingSpaces.Where(tps => tps.ParkingSpaceId == parkingSpaceId).FirstOrDefaultAsync();
        }

        public async Task<List<ParkingSpace>> GetTakenParkingSpacesByUserId(List<TakenParkingSpace> takenSpaces)
        {
            List<ParkingSpace> result = new List<ParkingSpace>();
            foreach (var takenParkingSpace in takenSpaces)
            {
                var parkingSpace = await _dbContext.ParkingSpaces.Where(ps => ps.Id == takenParkingSpace.ParkingSpaceId && ps.IsTaken == true && ps.IsRemoved == false)
                                                                    .FirstOrDefaultAsync();
                result.Add(parkingSpace);
            }
            return result;
        }

        public async Task<ParkingSpace> AddParkingSpace(ParkingSpace parkingSpace)
        {
            await _dbContext.ParkingSpaces.AddAsync(parkingSpace);
            await _dbContext.SaveChangesAsync();
            return parkingSpace;
        }

        public async Task<List<ParkingSpace>> GetUnapprovedParkingSpaces()
        {
            return await _dbContext.ParkingSpaces.Where(ps => ps.IsApproved == false && ps.IsRemoved == false).OrderBy(ps => ps.DateAdded).ToListAsync();
        }

        public async Task<List<ApplicationUser>> GetAllUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<List<IdentityRole>> GetAllRoles()
        {
            return await _dbContext.Roles.ToListAsync();
        }

        public async Task<ApplicationUser> GetUserById(string userId)
        {
            return await _dbContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<ApplicationUser> EditUser(ApplicationUser userPartialData)
        {
            ApplicationUser userFromDb = await _dbContext.Users.Where(u => u.Id == userPartialData.Id).FirstOrDefaultAsync();
            // username also needs to change as it is the same as the email
            userFromDb.UserName = userPartialData.Email;
            userFromDb.Email = userPartialData.Email;
            userFromDb.FirstName = userPartialData.FirstName;
            userFromDb.LastName = userPartialData.LastName;
            userFromDb.PartnerPercentage = userPartialData.PartnerPercentage;
            _dbContext.Users.Attach(userFromDb);
            _dbContext.Entry(userFromDb).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return userFromDb;
        }

        public async Task BuyCredits(string userId, decimal amount)
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {

                var userFromDb = await _dbContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
                userFromDb.Credits += amount;
                _dbContext.Users.Attach(userFromDb);
                _dbContext.Entry(userFromDb).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                // at this time the ration is 2 credits 1 EUR hardcoded
                decimal creditPrice = 0.5m;
                CreditPackPurchase creditPackPurchase = new CreditPackPurchase();
                creditPackPurchase.UserId = userFromDb.Id;
                creditPackPurchase.UserEmail = userFromDb.Email;
                creditPackPurchase.Amount = amount;
                creditPackPurchase.AmountPaid = amount * creditPrice;
                creditPackPurchase.DateOfPurchase = DateTime.Now;
                await _dbContext.CreditPackPurchases.AddAsync(creditPackPurchase);
                await _dbContext.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
        }

        public async Task ApproveParkingSpace(int parkingSpaceId)
        {
            ParkingSpace parkingSpaceFromDb = await _dbContext.ParkingSpaces.Where(ps => ps.Id == parkingSpaceId).FirstOrDefaultAsync();
            parkingSpaceFromDb.IsApproved = true;
            _dbContext.ParkingSpaces.Attach(parkingSpaceFromDb);
            _dbContext.Entry(parkingSpaceFromDb).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<CashOut> AddCashOutRequest(CashOut cashOut)
        {
            await _dbContext.CashOuts.AddAsync(cashOut);
            await _dbContext.SaveChangesAsync();
            return cashOut;
        }

        public async Task<List<CashOut>> GetUnapprovedCashOuts()
        {
            return await _dbContext.CashOuts.Where(co => co.IsApproved == false).OrderBy(co => co.DateSubmitted).ToListAsync();
        }

        public async Task ApproveCashOut(int cashOutRequestId, string adminId, string adminEmail)
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                CashOut cashOutRequestFromDb = await _dbContext.CashOuts.Where(co => co.Id == cashOutRequestId).FirstOrDefaultAsync();
                cashOutRequestFromDb.IsApproved = true;
                cashOutRequestFromDb.ApprovedById = adminId;
                cashOutRequestFromDb.ApprovedByEmail = adminEmail;
                _dbContext.CashOuts.Attach(cashOutRequestFromDb);
                _dbContext.Entry(cashOutRequestFromDb).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                ApplicationUser userFromDb = await _dbContext.Users.Where(u => u.Id == cashOutRequestFromDb.UserId).FirstOrDefaultAsync();
                userFromDb.Credits -= cashOutRequestFromDb.Amount;
                _dbContext.Users.Attach(userFromDb);
                _dbContext.Entry(userFromDb).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
        }

        public async Task<List<CreditPackPurchase>> GetUserPurchaseHistoryById(string userId)
        {
            return await _dbContext.CreditPackPurchases.Where(cpp => cpp.UserId == userId).OrderByDescending(cpp => cpp.DateOfPurchase).ToListAsync();
        }

        public async Task<List<ParkingSpaceRental>> GetUserRentalsById(string userId)
        {
            return await _dbContext.ParkingSpaceRentals.Where(psr => psr.UserId == userId).OrderByDescending(psr => psr.DateEnded).ToListAsync();
        }

        public async Task<List<ParkingSpaceRental>> GetOwnerRentalsById(string userId)
        {
            return await _dbContext.ParkingSpaceRentals.Where(psr => psr.OwnerId == userId).OrderByDescending(psr => psr.DateEnded).ToListAsync();
        }

        public async Task<List<ParkingSpaceRental>> GetParkingSpaceTransactionsById(int parkingSpaceId)
        {
            return await _dbContext.ParkingSpaceRentals.Where(psr => psr.ParkingSpaceId == parkingSpaceId).OrderByDescending(psr => psr.DateEnded).ToListAsync();
        }

        public async Task<List<CashOut>> GetApprovedCashOutsForUserId(string userId)
        {
            return await _dbContext.CashOuts.Where(co => co.UserId == userId && co.IsApproved == true).OrderByDescending(co => co.DateSubmitted).ToListAsync();
        }
    }
}
