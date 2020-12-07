using Microsoft.EntityFrameworkCore;
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
        private readonly ParkUpContext _context;

        public EFRepository(ParkUpContext context)
        {
            _context = context;
        }

        public async Task<List<City>> GetAllCities()
        {
            return await _context.Cities.ToListAsync();
        }

    }
}
