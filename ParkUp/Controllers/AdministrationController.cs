using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkUp.Core.Entities;
using ParkUp.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.Controllers
{
    public class AdministrationController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdministrationController(RoleManager<IdentityRole> roleManager,
                                        UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }
        [HttpGet]
        public IActionResult CreateRole()
        {
            return View("CreateRole");
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole(RoleViewModel roleViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    IdentityRole identityRole = new IdentityRole
                    {
                        Name = roleViewModel.RoleName
                    };

                    IdentityResult result = await _roleManager.CreateAsync(identityRole);

                    if (result.Succeeded)
                    {
                        return RedirectToAction("AllRoles", "Administration");
                    }
                    foreach (IdentityError error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
                catch (DbUpdateException dbex)
                {
                    ViewData["ErrorMessage"] = "DB issue - " + dbex.Message;
                    return View("Error");
                }
                catch (Exception ex)
                {
                    ViewData["ErrorMessage"] = ex.Message;
                    return View("Error");
                }
            }
            return View("CreateRole", roleViewModel);
        }

        [HttpGet]
        public async Task<IActionResult> AllRoles()
        {
            try
            {
                var roles = _roleManager.Roles;
                List<IdentityRole> inMemoryRoles = new List<IdentityRole>();
                foreach (var role in roles)
                {
                    inMemoryRoles.Add(role);
                }
                Dictionary<string, List<string>> roleUsers = new Dictionary<string, List<string>>();
                foreach (var role in inMemoryRoles)
                {
                    var usersInRole = await _userManager.GetUsersInRoleAsync(role.Name);
                    var emailsInRole = usersInRole.Select(u => u.Email).ToList();
                    roleUsers.Add(role.Name, emailsInRole);
                }
                AllRolesDisplayObject rolesAndMembers = new AllRolesDisplayObject
                {
                    Roles = roles,
                    UserLists = roleUsers
                };
                return View("AllRoles", rolesAndMembers);
            }
            catch (DbUpdateException dbex)
            {
                ViewData["ErrorMessage"] = "DB issue - " + dbex.Message;
                return View("Error");
            }
            catch (Exception ex)
            {
                ViewData["ErrorMessage"] = ex.Message;
                return View("Error");
            }
        }
    }
}
