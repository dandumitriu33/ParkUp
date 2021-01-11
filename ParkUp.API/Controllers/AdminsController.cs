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
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminsController(IAsyncRepository repository,
                                IMapper mapper,
                                RoleManager<IdentityRole> roleManager,
                                UserManager<ApplicationUser> userManager)
        {
            _repository = repository;
            _mapper = mapper;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        // POST: api/<AdminsController>/add-new-role
        [HttpPost]
        [Route("add-new-role")]
        [Authorize(Roles ="SuperAdmin")]
        public async Task<IActionResult> AddNewRole(ApplicationRoleDTO applicationRoleDTO)
        {
            if (ModelState.IsValid)
            {
                IdentityRole newRole = new IdentityRole
                {
                    Name = applicationRoleDTO.Name
                };
                IdentityResult result = await _roleManager.CreateAsync(newRole);
                if (result.Succeeded)
                {
                    return Ok();
                }
            }
            return BadRequest();
            
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

        // GET: api/<AdminsController>/get-user-info/abcd
        [HttpGet]
        [Route("get-user-info/{userId}")]
        public async Task<IActionResult> GetUserInfoForAdmin(string userId)
        {
            try
            {
                var userFromDb = await _userManager.FindByIdAsync(userId);
                ApplicationUserDTO applicationUser = _mapper.Map<ApplicationUser, ApplicationUserDTO>(userFromDb);
                var payload = JsonSerializer.Serialize(applicationUser);
                return Ok(payload);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }


    }
}
