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

        public async Task<List<ParkingSpace>> GetAllParkingSpacesForArea(int areaId, string searchPhrase="")
        {
            if (String.IsNullOrEmpty(searchPhrase) == true)
            {
                return await _dbContext.ParkingSpaces
                .Where(ps => ps.AreaId == areaId && ps.IsRemoved == false)
                .OrderBy(ps => ps.Name)
                .ToListAsync();
            }
            return await _dbContext.ParkingSpaces
                .Where(ps => ps.AreaId == areaId 
                        && ps.IsRemoved == false 
                        && (ps.Name.Contains(searchPhrase) 
                                || ps.Description.Contains(searchPhrase) 
                                || ps.StreetName.Contains(searchPhrase)))
                .OrderBy(ps => ps.Name)
                .ToListAsync();
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

                var parkingspaceFromDb = await _dbContext.ParkingSpaces.Where(ps => ps.Id == takenParkingSpace.ParkingSpaceId).FirstOrDefaultAsync();
                var ownerFromDb = await _dbContext.Users.Where(u => u.Id == parkingspaceFromDb.OwnerId).FirstOrDefaultAsync();
                ownerFromDb.Credits += payment;
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

        public async Task BuyCredits(string userId, decimal amount)
        {
            var userFromDb = await _dbContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            userFromDb.Credits += amount;
            _dbContext.Users.Attach(userFromDb);
            _dbContext.Entry(userFromDb).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task ApproveParkingSpace(int parkingSpaceId)
        {
            ParkingSpace parkingSpaceFromDb = await _dbContext.ParkingSpaces.Where(ps => ps.Id == parkingSpaceId).FirstOrDefaultAsync();
            parkingSpaceFromDb.IsApproved = true;
            _dbContext.ParkingSpaces.Attach(parkingSpaceFromDb);
            _dbContext.Entry(parkingSpaceFromDb).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

    }
}
