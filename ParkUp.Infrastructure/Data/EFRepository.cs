﻿using Microsoft.EntityFrameworkCore;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using System;
using System.Collections.Generic;
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

        public async Task<List<ApplicationUser>> GetAllUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }

    }
}
