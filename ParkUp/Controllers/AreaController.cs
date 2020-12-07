using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
    }
}
