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
    public class AreasController : ControllerBase
    {
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public AreasController(IAsyncRepository repository,
                               IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/<AreasController>
        [HttpGet]
        [Route("{cityId?}")]
        public async Task<string> GetCityAreas(int cityId)
        {
            List<Area> areasFromDb = await _repository.GetAllAreasForCity(cityId);
            List<AreaDTO> allAreasDTO = _mapper.Map<List<Area>, List<AreaDTO>>(areasFromDb);
            var payload = JsonSerializer.Serialize(allAreasDTO);
            return payload;
        }
    }
}
