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
    public class AreaController : Controller
    {
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public AreaController(IAsyncRepository repository,
                              IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<IActionResult> AllAreas()
        {
            List<Area> areasFromDb = await _repository.GetAllAreas();
            List<AreaViewModel> allAreasVM = _mapper.Map<List<Area>, List<AreaViewModel>>(areasFromDb);
            return View("AllAreas", allAreasVM);
        }

        [HttpGet]
        public async Task<IActionResult> AddArea()
        {
            List<City> allCitiesFromDb = await _repository.GetAllCities();
            List<CityViewModel> allCitiesVM = _mapper.Map<List<City>, List<CityViewModel>>(allCitiesFromDb);
            ViewData["AllCitiesVM"] = allCitiesVM;
            return View("AddArea");
        }

        [HttpPost]
        public async Task<IActionResult> AddArea(AreaViewModel areaViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Area newArea = _mapper.Map<AreaViewModel, Area>(areaViewModel);
                    await _repository.AddArea(newArea);
                    CityArea newCityArea = new CityArea
                    {
                        Area = newArea,
                        CityId = areaViewModel.CityId
                    };
                    await _repository.AddCityArea(newCityArea);
                    return RedirectToAction("AllAreas");
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
            return View("AddArea", areaViewModel);
        }
    }
}
