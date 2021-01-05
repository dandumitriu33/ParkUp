using AutoMapper;
using ParkUp.API.Models;
using ParkUp.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.API.AutomapperProfiles
{
    public class ParkUpAPIProfiles : Profile
    {
        public ParkUpAPIProfiles()
        {
            CreateMap<City, CityDTO>()
                .ReverseMap();
            CreateMap<Area, AreaDTO>()
                .ReverseMap();
            CreateMap<ParkingSpace, ParkingSpaceDTO>()
                .ReverseMap();
            CreateMap<TakenParkingSpace, TakenParkingSpaceDTO>()
                .ReverseMap();
            CreateMap<CreditPackPurchase, CreditPackPurchaseDTO>()
                .ReverseMap();
            CreateMap<ParkingSpaceRental, ParkingSpaceRentalDTO>()
                .ReverseMap();
            CreateMap<ApplicationUser, ApplicationUserDTO>()
                .ReverseMap();
        }
    }
}
