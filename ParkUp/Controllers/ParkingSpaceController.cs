using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using ParkUp.Models;
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
            try
            {
                List<ParkingSpace> parkingSpacesFromDb = await _repository.GetAllParkingSpaces();
                List<ParkingSpaceViewModel> parkingSpacesVM = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceViewModel>>(parkingSpacesFromDb);
                return View("AllParkingSpaces", parkingSpacesVM);
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

        [HttpGet]
        public async Task<IActionResult> EditParkingSpace(int parkingSpaceId)
        {
            try
            {
                ParkingSpace parkingSpaceFromDb = await _repository.GetParkingSpaceById(parkingSpaceId);
                if (parkingSpaceFromDb == null)
                {
                    throw new Exception("404 Not found.");
                }
                ParkingSpaceViewModel tempParkingSpaceVM = _mapper.Map<ParkingSpace, ParkingSpaceViewModel>(parkingSpaceFromDb);
                return View("EditParkingSpace", tempParkingSpaceVM);
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

        [HttpGet]
        public async Task<IActionResult> ForceFreeParkingSpace(int parkingSpaceId)
        {
            try
            {
                TakenParkingSpace instance = await _repository.GetTakenInstanceByParkingSpaceId(parkingSpaceId);
                if (instance == null)
                {
                    throw new Exception("404 Not found.");
                }
                await _repository.LeaveParkingSpace(instance);
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

        [HttpPost]
        public async Task<IActionResult> EditParkingSpace(ParkingSpaceViewModel parkingSpaceViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // at this time just Name, Street Name, Description and price
                    ParkingSpace tempParkingSpace = new ParkingSpace();
                    tempParkingSpace.Id = parkingSpaceViewModel.Id;
                    tempParkingSpace.Name = parkingSpaceViewModel.Name;
                    tempParkingSpace.StreetName = parkingSpaceViewModel.StreetName;
                    tempParkingSpace.Description = parkingSpaceViewModel.Description;
                    tempParkingSpace.HourlyPrice = parkingSpaceViewModel.HourlyPrice;
                    tempParkingSpace.GPS = parkingSpaceViewModel.GPS;
                    tempParkingSpace.Latitude = Convert.ToDouble(tempParkingSpace.GPS.Split(',')[0].Replace(" ", ""));
                    tempParkingSpace.Longitude = Convert.ToDouble(tempParkingSpace.GPS.Split(',')[1].Replace(" ", ""));
                    await _repository.EditParkingSpace(tempParkingSpace);
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
            return View("EditParkingSpace", parkingSpaceViewModel);
        }

        [HttpGet]
        public async Task<IActionResult> RemoveParkingSpace(int parkingSpaceId)
        {
            try
            {
                await _repository.RemoveParkingSpaceById(parkingSpaceId);
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
    }
}
