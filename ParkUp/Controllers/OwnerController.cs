using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public IActionResult MyParkingSpaces()
        {
            return View("MyParkingSpaces");
        }

        [HttpGet]
        public IActionResult AddParkingSpace()
        {
            return View("AddParkingSpace");
        }

        [HttpPost]
        public async Task<IActionResult> AddParkingSpace(ParkingSpaceViewModel parkingSpaceViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ParkingSpace newParkingSpace = _mapper.Map<ParkingSpaceViewModel, ParkingSpace>(parkingSpaceViewModel);
                    newParkingSpace.DateAdded = DateTime.Now;
                    await _repository.AddParkingSpace(newParkingSpace);
                    return RedirectToAction("MyParkingSpaces");
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
            return View("AddParkingSpace", parkingSpaceViewModel);
        }
    }
}
