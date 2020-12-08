﻿using AutoMapper;
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
        }
    }
}