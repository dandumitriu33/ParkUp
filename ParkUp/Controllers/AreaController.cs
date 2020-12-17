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
            try
            {
                List<Area> areasFromDb = await _repository.GetAllAreas();
                List<AreaViewModel> allAreasVM = _mapper.Map<List<Area>, List<AreaViewModel>>(areasFromDb);
                return View("AllAreas", allAreasVM);
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
