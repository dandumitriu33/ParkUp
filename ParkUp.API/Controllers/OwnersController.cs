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

        // GET: api/<OwnersController>
        [HttpGet]
        [Route("{userId?}")]
        public async Task<string> GetMyParkingSpaces(string userId)
        {
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetParkingSpacesForOwnerId(userId);
            List<ParkingSpaceDTO> allParkingSpacesDTO = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceDTO>>(parkingSpacesFromDb);
            var payload = JsonSerializer.Serialize(allParkingSpacesDTO);
            return payload;
        }
    }
}
