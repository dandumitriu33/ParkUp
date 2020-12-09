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

        // GET: api/<AreasController>
        [HttpGet]
        [Route("{areaId?}/search/{searchPhrase?}")]
        public async Task<string> GetAreaParkingSpaces(int areaId, string searchPhrase)
        {
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetAllParkingSpacesForArea(areaId, searchPhrase);
            List<ParkingSpaceDTO> allPArkingSpacesDTO = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceDTO>>(parkingSpacesFromDb);
            var payload = JsonSerializer.Serialize(allPArkingSpacesDTO);
            return payload;
        }
    }
}
