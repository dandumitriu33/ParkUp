﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using ParkUp.Models;
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
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public OwnerController(UserManager<ApplicationUser> userManager,
                               IAsyncRepository repository,
                               IMapper mapper)
        {
            _userManager = userManager;
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
                    newParkingSpace.Latitude = Convert.ToDouble(newParkingSpace.GPS.Split(',')[0].Replace(" ", ""));
                    newParkingSpace.Longitude = Convert.ToDouble(newParkingSpace.GPS.Split(',')[1].Replace(" ", ""));
                    newParkingSpace.DateAdded = DateTime.Now;
                    await _repository.AddParkingSpace(newParkingSpace);
                    return RedirectToAction("MyParkingSpaces");
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
            return View("AddParkingSpace", parkingSpaceViewModel);
        }

        [HttpGet]
        public IActionResult RequestCashOut()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> RequestCashOut(CashOutViewModel cashOutViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    cashOutViewModel.DateSubmitted = DateTime.Now;
                    CashOut newCashOut = _mapper.Map<CashOutViewModel, CashOut>(cashOutViewModel);
                    await _repository.AddCashOutRequest(newCashOut);
                    return RedirectToAction("Index", "Home");
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
            return View("RequestCashOut");
        }

        [HttpGet]
        public async Task<IActionResult> TransactionHistory()
        {
            try
            {
                ApplicationUser applicationUser = await _userManager.GetUserAsync(User);
                string userId = applicationUser.Id;
                List<ParkingSpaceRental> rentalsFromDb = await _repository.GetOwnerRentalsById(userId);
                List<ParkingSpaceRentalViewModel> rentalsViewModel = _mapper.Map<List<ParkingSpaceRental>, List<ParkingSpaceRentalViewModel>>(rentalsFromDb);
                return View("TransactionHistory", rentalsViewModel);
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
