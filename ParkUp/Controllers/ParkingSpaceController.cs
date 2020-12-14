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
    public class ParkingSpaceController : Controller
    {
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public ParkingSpaceController(IAsyncRepository repository,
                                      IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IActionResult> AllParkingSpaces()
        {
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetAllParkingSpaces();
            List<ParkingSpaceViewModel> parkingSpacesVM = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceViewModel>>(parkingSpacesFromDb);
            return View("AllParkingSpaces", parkingSpacesVM);
        }
    }
}
