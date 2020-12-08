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
        public IActionResult AddArea()
        {
            return View("AddArea");
        }

        [HttpPost]
        public async Task<IActionResult> AddARea(AreaViewModel areaViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Area newArea = _mapper.Map<AreaViewModel, Area>(areaViewModel);
                    var result = await _repository.AddArea(newArea);
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
