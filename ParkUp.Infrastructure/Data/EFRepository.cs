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

        public async Task<List<ParkingSpace>> GetParkingSpacesForOwnerId(string userId)
        {
            return await _dbContext.ParkingSpaces.Where(ps => ps.OwnerId == userId && ps.IsRemoved == false).OrderBy(ps => ps.Name).ToListAsync();
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
                .Where(ps => ps.AreaId == areaId && ps.IsRemoved == false && (ps.Description.Contains(searchPhrase) || ps.StreetName.Contains(searchPhrase)))
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

        public async Task<List<ApplicationUser>> GetAllUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }

        

    }
}
