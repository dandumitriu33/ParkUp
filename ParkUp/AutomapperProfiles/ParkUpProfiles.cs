﻿using AutoMapper;
using ParkUp.Core.Entities;
using ParkUp.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.AutomapperProfiles
{
    public class ParkUpProfiles : Profile
    {
        public ParkUpProfiles()
        {
            CreateMap<City, CityViewModel>()
                .ReverseMap();
            CreateMap<Area, AreaViewModel>()
                .ReverseMap();
            CreateMap<ParkingSpace, ParkingSpaceViewModel>()
               .ReverseMap();
            CreateMap<ApplicationUser, ApplicationUserViewModel>()
                .ReverseMap();
            CreateMap<CashOut, CashOutViewModel>()
                .ReverseMap();
            CreateMap<CreditPackPurchase, CreditPackPurchaseViewModel>()
                .ReverseMap();
            CreateMap<ParkingSpaceRental, ParkingSpaceRentalViewModel>()
                .ReverseMap();
        }
    }
}
