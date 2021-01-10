using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class ParkingSpacesController : ControllerBase
    {
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public ParkingSpacesController(IAsyncRepository repository,
                                       IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // POST: api/<ParkingSpacesController>/add-new-parking-space
        [HttpPost]
        [Route("add-new-parking-space")]
        [Authorize(Roles ="Owner,SuperAdmin")]
        public async Task<IActionResult> AddNewParkingSpace(ParkingSpaceDTO parkingSpaceDTO)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ParkingSpace newParkingSpace = _mapper.Map<ParkingSpaceDTO, ParkingSpace>(parkingSpaceDTO);
                    newParkingSpace.Latitude = Convert.ToDouble(newParkingSpace.GPS.Split(',')[0].Replace(" ", ""));
                    newParkingSpace.Longitude = Convert.ToDouble(newParkingSpace.GPS.Split(',')[1].Replace(" ", ""));
                    newParkingSpace.DateAdded = DateTime.Now;
                    await _repository.AddParkingSpace(newParkingSpace);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest("Bad request.");
                }
            }
            return BadRequest("Bad request.");
        }

        // GET: api/<ParkingSpacesController>/unapproved
        [HttpGet]
        [Authorize(Roles ="Admin,SuperAdmin")]
        [Route("unapproved")]
        public async Task<string> GetUnapprovedParkingSpaces()
        {
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetUnapprovedParkingSpaces();
            List<ParkingSpaceDTO> allParkingSpacesDTO = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceDTO>>(parkingSpacesFromDb);
            var payload = JsonSerializer.Serialize(allParkingSpacesDTO);
            return payload;
        }

        // GET: api/<ParkingSpacesController>
        [HttpGet]
        [Route("{areaId?}/search/{searchPhrase?}")]
        public async Task<string> GetAreaParkingSpaces(int areaId, string searchPhrase)
        {
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetAllParkingSpacesForArea(areaId, searchPhrase);
            List<ParkingSpaceDTO> allParkingSpacesDTO = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceDTO>>(parkingSpacesFromDb);
            var payload = JsonSerializer.Serialize(allParkingSpacesDTO);
            return payload;
        }

        //GET: api/<ParkingSpaceController>/nearby
        [HttpGet]
        [Route("nearby/{latitude}/{longitude}")]
        public async Task<string> GetNearbyParkingSpaces(double latitude, double longitude)
        {
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetAllNearbyParkingSpaces(latitude, longitude);
            List<ParkingSpaceDTO> allParkingSpacesDTO = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceDTO>>(parkingSpacesFromDb);
            var payload = JsonSerializer.Serialize(allParkingSpacesDTO);
            return payload;
        }

        // POST: api/<ParkingSpacesController>/remove-parking-space/5
        [HttpPost]
        [Route("remove-parking-space/{parkingSpaceId}")]
        public async Task<IActionResult> RemoveParkingSpace(int parkingSpaceId)
        {
            try
            {
                await _repository.RemoveParkingSpaceById(parkingSpaceId);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/<ParkingSpacesController>/take
        [HttpPost]
        [Route("take")]
        public async Task<IActionResult> TakeParkingSpace([FromBody] TakenParkingSpaceDTO takenParkingSpaceDTO)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest("Bad request.");
            }
            TakenParkingSpace newTakenParkingSpace = _mapper.Map<TakenParkingSpaceDTO, TakenParkingSpace>(takenParkingSpaceDTO);
            newTakenParkingSpace.DateStarted = DateTime.Now;
            await _repository.TakeParkingSpace(newTakenParkingSpace);
            
            return Ok($"Parking space taken successfully."); ;
        }

        // POST: api/<ParkingSpacesController>/leave
        [HttpPost]
        [Route("leave")]
        public async Task<IActionResult> LeaveParkingSpace([FromBody] TakenParkingSpaceDTO takenParkingSpaceDTO)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest("Bad request.");
            }
            TakenParkingSpace newTakenParkingSpace = _mapper.Map<TakenParkingSpaceDTO, TakenParkingSpace>(takenParkingSpaceDTO);
            await _repository.LeaveParkingSpace(newTakenParkingSpace);

            return Ok($"Parking space left successfully."); ;
        }

        // GET: api/<ParkingSpacesController>/{userId}
        [HttpGet]
        [Route("{userId}")]
        public async Task<string> GetTakenParkingSpaces(string userId)
        {
            List<TakenParkingSpace> takenInstancesFromDb = await _repository.GetTakenInstancesByUserId(userId);
            List<ParkingSpaceDTO> allTakenParkingSpacesDTO = new List<ParkingSpaceDTO>();
            if (takenInstancesFromDb.Count > 0)
            {
                List<ParkingSpace> parkingSpacesFromDb = await _repository.GetTakenParkingSpacesByUserId(takenInstancesFromDb);
                allTakenParkingSpacesDTO = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceDTO>>(parkingSpacesFromDb);
                foreach (var parkingSpaceDTO in allTakenParkingSpacesDTO)
                {
                    var instance = takenInstancesFromDb.Where(i => i.ParkingSpaceId == parkingSpaceDTO.Id).FirstOrDefault();
                    parkingSpaceDTO.DateStarted = instance.DateStarted;
                }
            }
            var payload = JsonSerializer.Serialize(allTakenParkingSpacesDTO);
            return payload;
        }

        // GET: api/<ParkingSpacesController>/get-single-parking-space/5
        [HttpGet]
        [Route("get-single-parking-space/{parkingSpaceId}")]
        public async Task<IActionResult> GetSingleParkingSpace(int parkingSpaceId)
        {
            try
            {
                ParkingSpace parkingSpaceFromDb = await _repository.GetParkingSpaceById(parkingSpaceId);
                ParkingSpaceDTO parkingSpaceDTO = _mapper.Map<ParkingSpace, ParkingSpaceDTO>(parkingSpaceFromDb);
                var payload = JsonSerializer.Serialize(parkingSpaceDTO);
                return Ok(payload);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/<ParkingSpacesController>/edit-parking-space/5
        [HttpPost]
        [Route("edit-parking-space")]
        public async Task<IActionResult> EditParkingSpace([FromBody] ParkingSpaceDTO parkingSpaceDTO)
        {
            // TODO check if currently signed in user is the owner of the PS to be edited
            if (ModelState.IsValid == true)
            {
                try
                {
                    ParkingSpace editedParkingSpace = _mapper.Map<ParkingSpaceDTO, ParkingSpace>(parkingSpaceDTO);
                    editedParkingSpace.Latitude = Convert.ToDouble(editedParkingSpace.GPS.Split(',')[0].Replace(" ", ""));
                    editedParkingSpace.Longitude = Convert.ToDouble(editedParkingSpace.GPS.Split(',')[1].Replace(" ", ""));
                    await _repository.EditParkingSpaceAngular(editedParkingSpace);
                    return Ok();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
                
            }
            return BadRequest();
        }

    }
}
