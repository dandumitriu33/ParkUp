using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using ParkUp.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ParkUp.Web.Controllers
{
    public class OwnerController : Controller
    {
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public OwnerController(IAsyncRepository repository,
                               IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public IActionResult MyParkingSpaces()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            List<ParkingSpace> parkingSpacesFromDb = _repository.GetParkingSpacesForOwnerId(userId);
            List<ParkingSpaceViewModel> parkingSpacesVM = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceViewModel>>(parkingSpacesFromDb);
            return View("MyParkingSpaces", parkingSpacesVM);
        }
    }
}
