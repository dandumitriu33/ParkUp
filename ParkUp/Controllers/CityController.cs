using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using ParkUp.Models;
using ParkUp.Web.ViewModels;
using System;
using System.Collections.Generic;
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
            try
            {
                List<City> citiesFromDb = await _repository.GetAllCities();
                List<CityViewModel> allCitiesVM = _mapper.Map<List<City>, List<CityViewModel>>(citiesFromDb);
                return View("AllCities", allCitiesVM);
            }
            catch (DbUpdateException ex)
            {
                ErrorViewModel newError = new ErrorViewModel() { ErrorMessage = ex.Message };
                return View("Error", newError);
            }
            catch (Exception ex)
            {
                ErrorViewModel newError = new ErrorViewModel() { ErrorMessage = ex.Message };
                return View("Error", newError);
            }
        }
    }
}
