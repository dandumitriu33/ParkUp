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

        // POST api/<CitiesController>
        [HttpPost]
        [Authorize(Roles ="Admin,SuperAdmin")]
        public async Task<IActionResult> Post([FromBody] CityDTO cityDTO)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    City newCity = _mapper.Map<CityDTO, City>(cityDTO);
                    await _repository.AddCity(newCity);
                    return Ok();
                    //return Ok($"City \"{newCity.Name}\" was added successfully."); // Angular error because of the message
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

        // GET: api/<CitiesController>/get-single-city/5
        [HttpGet]
        [Route("get-single-city/{cityId}")]
        public async Task<IActionResult> GetSingleCity(int cityId)
        {
            try
            {
                City cityFromDb = await _repository.GetCityById(cityId);
                CityDTO cityDTO = _mapper.Map<City, CityDTO>(cityFromDb);
                var payload = JsonSerializer.Serialize(cityDTO);
                return Ok(payload);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/<CitiesController>/edit-city
        [HttpPost]
        [Route("edit-city")]
        public async Task<IActionResult> EditCity(CityDTO cityDTO)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    City modifiedCity = _mapper.Map<CityDTO, City>(cityDTO);
                    await _repository.EditCity(modifiedCity);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        // NOTE: it is safer to simply add an IsRemoved field for a city to increase agains accidental deletion
        // but this is an educational project so it includes a Delete and Remove from DB way 
        // DELETE api/<CitiesController>/5 
        [HttpDelete]
        [Route("{cityId}")]
        public async Task<IActionResult> Delete(int cityId)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _repository.DeleteCity(cityId);
                    return Ok();
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
