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

        // GET: api/<AreasController>/3
        [HttpGet]
        [Route("{cityId?}")]
        public async Task<string> GetCityAreas(int cityId)
        {
            List<Area> areasFromDb = await _repository.GetAllAreasForCity(cityId);
            List<AreaDTO> allAreasDTO = _mapper.Map<List<Area>, List<AreaDTO>>(areasFromDb);
            var payload = JsonSerializer.Serialize(allAreasDTO);
            return payload;
        }

        // GET: api/<AreasController>/get-single-area/5
        [HttpGet]
        [Route("get-single-area/{areaId}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> GetSingleArea(int areaId)
        {
            try
            {
                Area areaFromDb = await _repository.GetAreaById(areaId);
                AreaDTO areaDTO = _mapper.Map<Area, AreaDTO>(areaFromDb);
                var payload = JsonSerializer.Serialize(areaDTO);
                return Ok(payload);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/<AresController>/edit-area
        [HttpPost]
        [Route("edit-area")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> EditArea(AreaDTO areaDTO)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Area modifiedArea = _mapper.Map<AreaDTO, Area>(areaDTO);
                    await _repository.EditArea(modifiedArea);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        // POST: api/<AreasController>/remove-area/5
        [HttpPost]
        [Route("remove-area/{areaId}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> RemoveArea(int areaId)
        {
            try
            {
                await _repository.RemoveAreaById(areaId);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }            
        }

        // POST: api/<AreasController>/add-new-area - Angular route
        [HttpPost]
        [Route("add-new-area")]
        [Authorize(Roles ="Admin,SuperAdmin")]
        public async Task<IActionResult> AddArea(AreaDTO areaDTO)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Area newArea = _mapper.Map<AreaDTO, Area>(areaDTO);
                    await _repository.AddArea(newArea); // returns the Area Id from the new entry in the DB
                    CityArea newCityArea = new CityArea
                    {
                        CityId = newArea.CityId,
                        AreaId = newArea.Id
                    };
                    await _repository.AddCityArea(newCityArea);
                    return Ok();
                }
                catch (DbUpdateException dbex)
                {
                    // TODO: log error w/ message
                    return BadRequest();
                }
                catch (Exception ex)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        // POST: api/<AreasController>
        [HttpPost]
        [Route("{cityId?}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> AddNewArea([FromBody] AreaDTO areaDTO)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Area newArea = _mapper.Map<AreaDTO, Area>(areaDTO);
                    await _repository.AddArea(newArea);
                    CityArea newCityArea = new CityArea
                    {
                        CityId = newArea.CityId,
                        AreaId = newArea.Id
                    };
                    await _repository.AddCityArea(newCityArea);
                    return Ok($"Area \"{newArea.Name}\" was added successfully.");
                }
                catch (DbUpdateException dbex)
                {
                    // TODO: log error w/ message
                    return BadRequest("Bad request.");
                }
                catch (Exception ex)
                {
                    return BadRequest("Bad request.");
                }
            }
            return BadRequest("Bad request.");
        }
    }
}
