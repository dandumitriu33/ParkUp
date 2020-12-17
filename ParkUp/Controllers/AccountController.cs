using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using ParkUp.Models;
using ParkUp.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ParkUp.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;

        public AccountController(UserManager<ApplicationUser> userManager,
                                 SignInManager<ApplicationUser> signInManager,
                                 IAsyncRepository repository,
                                 IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View("Register");
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel registerViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var user = new ApplicationUser
                    {
                        FirstName = registerViewModel.FirstName,
                        LastName = registerViewModel.LastName,
                        UserName = registerViewModel.Email,
                        Email = registerViewModel.Email,
                        DateAdded = DateTime.Now
                    };
                    var result = await _userManager.CreateAsync(user, registerViewModel.Password);
                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, isPersistent: true); // permanent, not just session
                        return RedirectToAction("Index", "Home");
                    }
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
                catch (DbUpdateException ex)
                {
                    ErrorViewModel newError = new ErrorViewModel() { ErrorMessage = ex.Message };
                    return View("Error", newError);
                }
                catch (Exception ex)
                {
                    ErrorViewModel newError = new ErrorViewModel() { ErrorMessage = ex.Message };
                    return View("Error", newError);
                }
            }
            return View("Register", registerViewModel);
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View("Login");
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel loginViewModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var result = await _signInManager.PasswordSignInAsync(loginViewModel.Email, loginViewModel.Password, loginViewModel.RememberMe, false);

                    if (result.Succeeded)
                    {
                        return RedirectToAction("Index", "Home");
                    }
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
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
            return View("Login", loginViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> LogOut()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return RedirectToAction("Index", "Home");
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
        [AllowAnonymous]
        public IActionResult AccessDenied()
        {
            return View();
        }

        [HttpGet]
        public IActionResult BuyCredits()
        {
            return View("BuyCredits");
        }

        [HttpPost]
        public async Task<IActionResult> BuyCredits(CreditPack creditPack)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                    await _repository.BuyCredits(userId, creditPack.Amount);
                    return View("BuyCredits");
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
            return View("BuyCredits");
        }

        [HttpGet]
        public async Task<IActionResult> PurchaseHistory()
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);
            string userId = applicationUser.Id;
            List<CreditPackPurchase> historyFromDb = await _repository.GetUserPurchaseHistoryById(userId);
            List<CreditPackPurchaseViewModel> userPurchaseHistory = _mapper.Map<List<CreditPackPurchase>, List<CreditPackPurchaseViewModel>>(historyFromDb);
            return View("PurchaseHistory", userPurchaseHistory);
        }

        [HttpGet]
        public async Task<IActionResult> RentalHistory()
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);
            string userId = applicationUser.Id;
            List<ParkingSpaceRental> rentalsFromDb = await _repository.GetUserRentalsById(userId);
            List<ParkingSpaceRentalViewModel> rentalsViewModel = _mapper.Map<List<ParkingSpaceRental>, List<ParkingSpaceRentalViewModel>>(rentalsFromDb);
            return View("RentalHistory", rentalsViewModel);
        }
    }
}
