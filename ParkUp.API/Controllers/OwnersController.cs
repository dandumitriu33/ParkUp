using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ParkUp.API.Models;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace ParkUp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class OwnersController : ControllerBase
    {
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public OwnersController(IAsyncRepository repository,
                                IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // POST: api/<OwnersController>/request-cash-out>
        [HttpPost]
        [Route("request-cash-out")]
        [Authorize(Roles ="Owner,SuperAdmin")]
        public async Task<IActionResult> RequestCashOut(CashOutRequestDTO cashOutRequestDTO)
        {
            // build the CashOut object for DB
            var user = await _repository.GetUserById(cashOutRequestDTO.UserId);
            if (user != null && user.Credits > cashOutRequestDTO.Amount)
            {
                CashOut newCashOutRequest = new CashOut
                {
                    UserId = cashOutRequestDTO.UserId,
                    UserEmail = user.Email,
                    UserAvailable = user.Credits,
                    Amount = cashOutRequestDTO.Amount,
                    IsApproved = false,
                    DateSubmitted = DateTime.Now
                };
                await _repository.AddCashOutRequest(newCashOutRequest);
                return Ok();
            };
            return BadRequest();
        }

        // GET: api/<OwnersController>/all-cash-outs
        [HttpGet]
        [Route("all-unapproved-cash-outs")]
        [Authorize(Roles ="Admin,SuperAdmin")]
        public async Task<string> GetAllUnapprovedCashOuts()
        {
            List<CashOut> cashOutsFromDb = await _repository.GetUnapprovedCashOuts();
            List<CashOutDTO> allUnapprovedCashOuts = _mapper.Map<List<CashOut>, List<CashOutDTO>>(cashOutsFromDb);
            var payload = JsonSerializer.Serialize(allUnapprovedCashOuts);
            return payload;
        }

        // GET: api/<OwnersController>/get-all-approved-cash-outs-for-user/abcd
        [HttpGet]
        [Route("get-all-approved-cash-outs-for-user/{userId}")]
        //[Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<string> GetAllApprovedCashOutsForUser(string userId)
        {
            List<CashOut> cashOutsFromDb = await _repository.GetApprovedCashOutsForUserId(userId);
            List<CashOutDTO> allApprovedCashOuts = _mapper.Map<List<CashOut>, List<CashOutDTO>>(cashOutsFromDb);
            var payload = JsonSerializer.Serialize(allApprovedCashOuts);
            return payload;
        }

        // GET: api/<OwnersController>/all-transactions/userId
        [HttpGet]
        [Route("all-transactions/{userId}")]
        [Authorize(Roles ="Owner,SuperAdmin")]
        public async Task<string> GetAllOwnerTransactions(string userId)
        {
            List<ParkingSpaceRental> rentalsFromDb = await _repository.GetOwnerRentalsById(userId);
            List<ParkingSpaceRentalDTO> rentalsViewModel = _mapper.Map<List<ParkingSpaceRental>, List<ParkingSpaceRentalDTO>>(rentalsFromDb);
            var payload = JsonSerializer.Serialize(rentalsViewModel);
            return payload;
        }

        // GET: api/<OwnersController>/all-spaces/userId
        [HttpGet]
        [Route("all-spaces/{userId}")]
        public async Task<string> GetAllOwnerParkingSpaces(string userId)
        {
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetAllOwnerParkingSpaces(userId);
            List<ParkingSpaceDTO> allParkingSpacesDTO = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceDTO>>(parkingSpacesFromDb);
            var payload = JsonSerializer.Serialize(allParkingSpacesDTO);
            return payload;
        }

        // GET: api/<OwnersController>/abcd16/area/5/search/someText
        [HttpGet]
        [Route("{userId?}/area/{areaId?}/search/{searchPhrase?}")]
        [Authorize(Roles = "Owner,SuperAdmin")]
        public async Task<string> GetMyParkingSpaces(string userId, int areaId, string searchPhrase)
        {
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetParkingSpacesForOwnerId(userId, areaId, searchPhrase);
            List<ParkingSpaceDTO> allParkingSpacesDTO = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceDTO>>(parkingSpacesFromDb);
            var payload = JsonSerializer.Serialize(allParkingSpacesDTO);
            return payload;
        }
    }
}
