﻿using ParkUp.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ParkUp.Core.Interfaces
{
    public interface IAsyncRepository
    {
        Task<List<City>> GetAllCities();
        Task<City> AddCity(City city);
        Task<List<Area>> GetAllAreas();
        Task<Area> AddArea(Area area);
        Task<CityArea> AddCityArea(CityArea cityArea);
        Task<List<Area>> GetAllAreasForCity(int cityId);
        Task<List<ParkingSpace>> GetParkingSpacesForOwnerId(string userId);
        Task<List<ParkingSpace>> GetAllParkingSpacesForArea(int areaId, string searchPhrase = "");
        Task TakeParkingSpace(TakenParkingSpace takenParkingSpace);
        Task<List<ApplicationUser>> GetAllUsers();
    }
}
