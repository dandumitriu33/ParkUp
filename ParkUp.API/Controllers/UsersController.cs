using AutoMapper;
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
    public class UsersController : ControllerBase
    {
        private readonly IAsyncRepository _repository;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UsersController(IAsyncRepository repository,
                               IMapper mapper,
                               UserManager<ApplicationUser> userManager,
                               SignInManager<ApplicationUser> signInManager)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
        }


        // POST: api/<UsersController>/register
        [HttpPost]
        [Route("register")]
        public async Task<Object> PostApplicationUser(ApplicationUserDTO applicationUserDTO)
        {
            ApplicationUser newUser = new ApplicationUser()
            {
                FirstName = applicationUserDTO.FirstName,
                LastName = applicationUserDTO.LastName,
                Email = applicationUserDTO.Email,
                UserName = applicationUserDTO.Email,
                DateAdded = DateTime.Now
            };
            try
            {
                var result = await _userManager.CreateAsync(newUser, applicationUserDTO.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        // GET: api/<UsersController>/all-users
        [HttpGet]
        [Route("all-users")]
        public async Task<string> GetAllUsers()
        {
            List<ApplicationUser> usersFromDb = await _repository.GetAllUsers();
            List<ApplicationUserDTO> allUsers = _mapper.Map<List<ApplicationUser>, List<ApplicationUserDTO>>(usersFromDb);
            var payload = JsonSerializer.Serialize(allUsers);
            return payload;
        }

        // GET: api/<UsersController>/purchase-history/userId
        [HttpGet]
        [Route("purchase-history/{userId?}")]
        public async Task<string> GetUserPurchaseHistory(string userId)
        {
            List<CreditPackPurchase> historyFromDb = await _repository.GetUserPurchaseHistoryById(userId);
            List<CreditPackPurchaseDTO> userPurchaseHistory = _mapper.Map<List<CreditPackPurchase>, List<CreditPackPurchaseDTO>>(historyFromDb);
            var payload = JsonSerializer.Serialize(userPurchaseHistory);
            return payload;
        }

        // GET: api/<UsersController>/rental-history/userId
        [HttpGet]
        [Route("rental-history/{userId?}")]
        public async Task<string> GetUserRentalHistory(string userId)
        {
            List<ParkingSpaceRental> rentalsFromDb = await _repository.GetUserRentalsById(userId);
            List<ParkingSpaceRentalDTO> userRentalHistory = _mapper.Map<List<ParkingSpaceRental>, List<ParkingSpaceRentalDTO>>(rentalsFromDb);
            var payload = JsonSerializer.Serialize(userRentalHistory);
            return payload;
        }
    }
}
