using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using ParkUp.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkUp.Web.Controllers
{
    [Authorize]
    public class AdministrationController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public AdministrationController(RoleManager<IdentityRole> roleManager,
                                        UserManager<ApplicationUser> userManager,
                                        IAsyncRepository repository,
                                        IMapper mapper)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _repository = repository;
            _mapper = mapper;
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet]
        public IActionResult CreateRole()
        {
            return View("CreateRole");
        }

        [Authorize(Roles = "SuperAdmin")]
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

        [Authorize(Roles = "SuperAdmin")]
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

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet]
        public async Task<IActionResult> EditUsersInRole(string roleId)
        {
            try
            {
                var role = await _roleManager.FindByIdAsync(roleId);
                if (role == null)
                {
                    Response.StatusCode = 404;
                    ViewData["ErrorMessage"] = "404 Resource not found.";
                    return View("Error");
                }

                ViewData["roleId"] = roleId;
                ViewData["roleName"] = role.Name;

                List<ApplicationUser> allUsersFromDb = await _repository.GetAllUsers();
                var allUsersViewModel = _mapper.Map<List<ApplicationUser>, List<ApplicationUserViewModel>>(allUsersFromDb);

                return View("EditUsersInRole", allUsersViewModel);
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

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost]
        public async Task<IActionResult> AddUserToRole(UserRoleViewModel userRoleViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var user = await _userManager.FindByIdAsync(userRoleViewModel.UserId);
                    if (user == null)
                    {
                        Response.StatusCode = 404;
                        ViewData["ErrorMessage"] = "404 Resource not found.";
                        return View("Error");
                    }
                    var role = await _roleManager.FindByIdAsync(userRoleViewModel.RoleId);
                    if (role == null)
                    {
                        Response.StatusCode = 404;
                        ViewData["ErrorMessage"] = "404 Resource not found.";
                        return View("Error");
                    }
                    if ((await _userManager.IsInRoleAsync(user, role.Name)) == false)
                    {
                        IdentityResult result = await _userManager.AddToRoleAsync(user, role.Name);
                        if (result.Succeeded)
                        {
                            return RedirectToAction("AllRoles", "Administration");
                        }
                    }
                    return View("EditUsersInRole", new { roleId = userRoleViewModel.RoleId });
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
            return RedirectToAction("AllRoles", "Administration");
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet]
        [Route("administration/{roleId}/remove/{userEmail}")]
        public async Task<IActionResult> RemoveUserFromRole(string userEmail, string roleId)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                {
                    Response.StatusCode = 404;
                    ViewData["ErrorMessage"] = "404 Resource not found.";
                    return View("Error");
                }
                var role = await _roleManager.FindByIdAsync(roleId);
                if (role == null)
                {
                    Response.StatusCode = 404;
                    ViewData["ErrorMessage"] = "404 Resource not found.";
                    return View("Error");
                }
                if ((await _userManager.IsInRoleAsync(user, role.Name)) == true)
                {
                    IdentityResult result = await _userManager.RemoveFromRoleAsync(user, role.Name);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("AllRoles", "Administration");
                    }
                }
                return View("EditUsersInRole", new { roleId = roleId });
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

        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        public async Task<IActionResult> ApproveParkingSpaces()
        {
            // get list of unapproved parking spaces
            List<ParkingSpace> parkingSpacesFromDb = await _repository.GetUnapprovedParkingSpaces();
            List<ParkingSpaceViewModel> parkingSpacesVM = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceViewModel>> (parkingSpacesFromDb);
            return View("ApproveParkingSpaces", parkingSpacesVM);
        }

        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        public async Task<IActionResult> ApproveParkingSpace(int parkingSpaceId)
        {
            await _repository.ApproveParkingSpace(parkingSpaceId);
            return RedirectToAction("ApproveParkingSpaces");
        }

        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        public async Task<IActionResult> AllUsers()
        {
            List<ApplicationUser> allUsers = await _repository.GetAllUsers();
            return View("AllUsers", allUsers);
        }

        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        public async Task<IActionResult> EditUser(string userId)
        {
            ApplicationUser userFromDb = await _repository.GetUserById(userId);
            ApplicationUserViewModel appUserVM = _mapper.Map<ApplicationUser, ApplicationUserViewModel>(userFromDb);
            return View("EditUser", appUserVM);
        }

        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPost]
        public async Task<IActionResult> EditUser(ApplicationUserViewModel applicationUserViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // at this time just Email, First Name, Last Name and Partner Percentage
                    ApplicationUser userPartialData = new ApplicationUser();
                    userPartialData.Id = applicationUserViewModel.Id;
                    userPartialData.Email = applicationUserViewModel.Email;
                    userPartialData.FirstName = applicationUserViewModel.FirstName;
                    userPartialData.LastName = applicationUserViewModel.LastName;
                    userPartialData.PartnerPercentage = applicationUserViewModel.PartnerPercentage;
                    await _repository.EditUser(userPartialData);
                    return RedirectToAction("AllUsers");
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
            return View("EditUSer");
        }

        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        public async Task<IActionResult> ApproveCashOuts()
        {
            // get list of unapproved cash out requests
            List<CashOut> cashOutRequestsFromDb = await _repository.GetUnapprovedCashOuts();
            foreach (var cashOutRequest in cashOutRequestsFromDb)
            {
                var user = await _repository.GetUserById(cashOutRequest.UserId);
                cashOutRequest.UserAvailable = user.Credits;
            }
            List<CashOutViewModel> cashOutsVM = _mapper.Map<List<CashOut>, List<CashOutViewModel>>(cashOutRequestsFromDb);
            return View("ApproveCashOuts", cashOutsVM);
        }

        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        public async Task<IActionResult> ApproveCashOut(int cashOutRequestId)
        {
            try
            {
                ApplicationUser applicationUser = await _userManager.GetUserAsync(User);
                string adminEmail = applicationUser.Email;
                string adminId = applicationUser.Id;
                await _repository.ApproveCashOut(cashOutRequestId, adminId, adminEmail);
                return RedirectToAction("ApproveCashOuts");
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

        [HttpGet]
        [Authorize(Roles = "SuperAdmin,Admin,Owner")]
        public async Task<IActionResult> ParkingSpaceTransactions(int parkingSpaceId)
        {
            try
            {
                List<ParkingSpaceRental> transactionsFromDb = await _repository.GetParkingSpaceTransactionsById(parkingSpaceId);
                List<ParkingSpaceRentalViewModel> allTransactionsVM = _mapper.Map<List<ParkingSpaceRental>, List<ParkingSpaceRentalViewModel>>(transactionsFromDb);
                return View("ParkingSpaceTransactions", allTransactionsVM);
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

        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        [Route("administration/report/{userId}")]
        public async Task<IActionResult> UserReport(string userId)
        {
            ApplicationUser userFromDb = await _repository.GetUserById(userId);
            List<ParkingSpace> userParkingSpaces = await _repository.GetParkingSpacesByOwnerId(userId);
            List<ParkingSpaceRental> userRentalsAsOwner = await _repository.GetOwnerRentalsById(userId);
            List<CashOut> userCashOuts = await _repository.GetApprovedCashOutsForUserId(userId);
            UserReportViewModel report = assembleUserReport(userFromDb, userParkingSpaces, userRentalsAsOwner, userCashOuts);
            return View("UserReport", report);
        }

        private UserReportViewModel assembleUserReport(ApplicationUser userFromDb, 
                                                       List<ParkingSpace> userParkingSpaces, 
                                                       List<ParkingSpaceRental> userRentalsAsOwner, 
                                                       List<CashOut> userCashOuts)
        {
            UserReportViewModel result = new UserReportViewModel();

            // userVM
            ApplicationUserViewModel userVM = _mapper.Map<ApplicationUser, ApplicationUserViewModel>(userFromDb);
            result.AppUser = userVM;

            // parking spaces
            List<ParkingSpaceViewModel> parkingSpacesVM = _mapper.Map<List<ParkingSpace>, List<ParkingSpaceViewModel>>(userParkingSpaces);
            result.ParkingSpaces = parkingSpacesVM;

            // transactions as owner
            List<ParkingSpaceRentalViewModel> rentalsVM = _mapper.Map<List<ParkingSpaceRental>, List<ParkingSpaceRentalViewModel>>(userRentalsAsOwner);
            result.TransactionHistory = rentalsVM;

            // cash outs
            List<CashOutViewModel> cashOutsVM = _mapper.Map<List<CashOut>, List<CashOutViewModel>>(userCashOuts);
            result.CashOuts = cashOutsVM;

            // days joined
            DateTime start = userVM.DateAdded;
            DateTime end = DateTime.Now;
            TimeSpan duration = end.Subtract(start);
            int daysJoined = (int) duration.TotalMinutes / 60 / 24;
            result.DaysJoined = daysJoined;

            // lifetime sales
            decimal lifetimeGeneratedSales = rentalsVM.Select(r => r.AmountPaidByUser).Sum();
            result.LifetimeGeneratedSales = lifetimeGeneratedSales;

            // lifetime profit (for ParkUp)
            decimal totalAmountReceviedByUser = rentalsVM.Select(r => r.AmountReceivedByOwner).Sum();
            decimal lifetimeProfitGenerated = lifetimeGeneratedSales - totalAmountReceviedByUser;
            result.LifetimeProfitGenerated = lifetimeProfitGenerated;

            // lifetime CashOut
            decimal lifetimeCashOut = cashOutsVM.Select(co => co.Amount).Sum();
            result.LifeTimeCashOut = lifetimeCashOut;

            // monthly average sales
            decimal months = Math.Round((decimal)daysJoined / 30);
            decimal monthlyAverageSales = lifetimeGeneratedSales / (months < 1 ? 1 : months);
            result.MonthlyAverageSales = monthlyAverageSales;

            // average CashOut
            decimal averageCashOut = 0;
            if (cashOutsVM.Count == 0)
            {
                averageCashOut = Math.Round(lifetimeCashOut / 1);
            }
            else
            {
                averageCashOut = Math.Round(lifetimeCashOut / cashOutsVM.Count);
            }
            result.AverageCashOut = averageCashOut;

            return result;
        }
    }
}
