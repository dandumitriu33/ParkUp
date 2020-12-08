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

        [HttpGet]
        public IActionResult AddCity()
        {
            return View("AddCity");
        }

        [HttpPost]
        public async Task<IActionResult> AddCity(CityViewModel cityViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    City newCity = _mapper.Map<CityViewModel, City>(cityViewModel);
                    var result = await _repository.AddCity(newCity);
                    return RedirectToAction("AllCities");
                }
                catch (DbUpdateException dbex)
                {
                    ViewData["ErrorMessage"] = "DB issue - " + dbex.Message;
                    return View("Error");
                }
                catch (Exception ex)
                {
                    ViewData["ErrorMessage"] = ex.Message;
                    return View("Error");
                }
            }
            return View("AddCity", cityViewModel);
        }

    }
}
