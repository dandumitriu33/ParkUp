using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(Roles = "SuperAdmin,Admin,Owner")]
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

        [HttpGet]
        public async Task<IActionResult> MyParkingSpaces()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetParkingSpacesForOwnerId(userId);
            List<ParkingSpaceViewModel> parkingSpacesVM = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceViewModel>>(parkingSpacesFromDb);
            return View("MyParkingSpaces", parkingSpacesVM);
        }
    }
}
