using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using ParkUp.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.Controllers
{
    public class CityController : Controller
    {
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public CityController(IAsyncRepository repository,
                              IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<IActionResult> AllCities()
        {
            List<City> citiesFromDb = await _repository.GetAllCities();
            List<CityViewModel> allCitiesVM = _mapper.Map<List<City>, List<CityViewModel>>(citiesFromDb);
            return View("AllCities", allCitiesVM);
        }
    }
}
