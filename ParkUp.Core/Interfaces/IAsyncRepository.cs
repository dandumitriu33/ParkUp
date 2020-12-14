using ParkUp.Core.Entities;
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
        Task<List<ParkingSpace>> GetParkingSpacesForOwnerId(string userId, int areaId, string searchPhrase = "");
        Task<List<ParkingSpace>> GetAllParkingSpaces();
        Task<List<ParkingSpace>> GetAllParkingSpacesForArea(int areaId, string searchPhrase = "");
        Task<ParkingSpace> GetParkingSpaceById(int parkingSpaceId);
        Task TakeParkingSpace(TakenParkingSpace takenParkingSpace);
        Task LeaveParkingSpace(TakenParkingSpace takenParkingSpace);
        Task<List<TakenParkingSpace>> GetTakenInstancesByUserId(string userId);
        Task<List<ParkingSpace>> GetTakenParkingSpacesByUserId(List<TakenParkingSpace> takenSpaces);
        Task<ParkingSpace> AddParkingSpace(ParkingSpace parkingSpace);
        Task<List<ParkingSpace>> GetUnapprovedParkingSpaces();
        Task ApproveParkingSpace(int parkingSpaceId);
        Task<List<ApplicationUser>> GetAllUsers();
        Task<ApplicationUser> GetUserById(string userId);
        Task<ApplicationUser> EditUser(ApplicationUser userPartialData);
        Task BuyCredits(string userId, decimal amount);
        Task<CashOut> AddCashOutRequest(CashOut cashOut);
        Task<List<CashOut>> GetUnapprovedCashOuts();
        Task ApproveCashOut(int cashOutRequestId, string adminId, string adminEmail);
        Task<List<CreditPackPurchase>> GetUserPurchaseHistoryById(string userId);
        Task<List<ParkingSpaceRental>> GetUserRentalsById(string userId);
        Task<List<ParkingSpaceRental>> GetOwnerRentalsById(string userId);
        Task<List<ParkingSpaceRental>> GetParkingSpaceTransactionsById(int parkingSpaceId);
    }
}
