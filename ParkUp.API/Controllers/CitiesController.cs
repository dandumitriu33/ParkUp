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
    public class CitiesController : ControllerBase
    {
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public CitiesController(IAsyncRepository repository,
                                IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/<CitiesController>
        [HttpGet]
        public async Task<string> Get()
        {
            List<City> citiesFromDb = await _repository.GetAllCities();
            List<CityDTO> allCitiesDTO = _mapper.Map<List<City>, List<CityDTO>>(citiesFromDb);
            var payload = JsonSerializer.Serialize(allCitiesDTO);
            return payload;
        }


    }
}
