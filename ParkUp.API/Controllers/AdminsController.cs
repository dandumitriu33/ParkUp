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

        // POST: api/<AdminsController>/approve-cash-out
        [HttpPost]
        [Route("approve-cash-out")]
        [Authorize(Roles ="Admin,SuperAdmin")]
        public async Task<IActionResult> ApproveCashOut([FromBody] CashOutApprovalDTO cashOutApprovalDTO)
        {
            if (ModelState.IsValid == true)
            {
                try
                {
                    // log: UserId approved CashOutId
                    var user = await _userManager.FindByIdAsync(cashOutApprovalDTO.UserId);
                    await _repository.ApproveCashOut(cashOutApprovalDTO.CashOutId, user.Id, user.Email);
                    return Ok();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
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

        // POST: api/<AdminsController>/add-to-role
        [HttpPost]
        [Route("add-to-role")]
        public async Task<IActionResult> AddToRole(AddToRoleDTO addToRoleDTO)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByIdAsync(addToRoleDTO.UserId);
                var role = await _roleManager.FindByIdAsync(addToRoleDTO.RoleId);
                if (role == null || user == null)
                {
                    return BadRequest();
                }
                if (await _userManager.IsInRoleAsync(user, role.Name))
                {
                    return BadRequest();
                }
                IdentityResult result = await _userManager.AddToRoleAsync(user, role.Name);
                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }                
            }
            return BadRequest();
        }

        // POST: api/<AdminsController>/remove-from-role
        [HttpPost]
        [Route("remove-from-role")]
        public async Task<IActionResult> RemoveFromRole(AddToRoleDTO addToRoleDTO)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByIdAsync(addToRoleDTO.UserId);
                var role = await _roleManager.FindByIdAsync(addToRoleDTO.RoleId);
                if (role == null || user == null)
                {
                    return BadRequest();
                }
                if ((await _userManager.IsInRoleAsync(user, role.Name)) ==  false)
                {
                    return BadRequest();
                }
                IdentityResult result = await _userManager.RemoveFromRoleAsync(user, role.Name);
                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        // GET: api/<AdminsController>/get-user-info/abcd
        [HttpGet]
        [Route("get-user-info/{userId}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
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
