using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
    public class AdminsController : ControllerBase
    {
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public AdminsController(IAsyncRepository repository,
                                IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/<AdminsController>/all-roles
        [HttpGet]
        [Authorize(Roles ="SuperAdmin")]
        [Route("all-roles")]
        public async Task<string> GetAllRoles()
        {
            List<IdentityRole> rolesFromDb = await _repository.GetAllRoles();
            List<ApplicationRoleDTO> allRoles = _mapper.Map<List<IdentityRole>, List<ApplicationRoleDTO>>(rolesFromDb);
            var payload = JsonSerializer.Serialize(allRoles);
            return payload;
        }



    }
}
