using AutoMapper;
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

        // GET: api/<ParkingSpacesController>
        [HttpGet]
        [Route("{areaId?}/search/{searchPhrase?}")]
        public async Task<string> GetAreaParkingSpaces(int areaId, string searchPhrase)
        {
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetAllParkingSpacesForArea(areaId, searchPhrase);
            List<ParkingSpaceDTO> allPArkingSpacesDTO = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceDTO>>(parkingSpacesFromDb);
            var payload = JsonSerializer.Serialize(allPArkingSpacesDTO);
            return payload;
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
    }
}
