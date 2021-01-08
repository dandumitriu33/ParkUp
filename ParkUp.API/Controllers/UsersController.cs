using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ParkUp.API.Models;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
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
        private readonly IdentityOptions _identityOptions;
        private readonly ApplicationSettings _applicationSettings;

        public UsersController(IAsyncRepository repository,
                               IMapper mapper,
                               UserManager<ApplicationUser> userManager,
                               SignInManager<ApplicationUser> signInManager,
                               IOptions<ApplicationSettings> applicationSettings,
                               IdentityOptions identityOptions)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _identityOptions = identityOptions;
            _applicationSettings = applicationSettings.Value; // the field is not the Interface, direct object so we can extract value
        }


        // POST: api/<UsersController>/register
        [HttpPost]
        [Route("register")]
        public async Task<Object> PostApplicationUser(ApplicationUserDTO applicationUserDTO)
        {
            applicationUserDTO.Role = "SuperAdmin"; // TODO: REMOVE AFTER PROMOTE TO ROLE IMPL
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
                await _userManager.AddToRoleAsync(newUser, applicationUserDTO.Role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST: api/<UsersController>/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                // get the roles assigned to the user and then add another Claim
                var role = await _userManager.GetRolesAsync(user);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        // TODO: for loop if more than one role
                        new Claim(_identityOptions.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.JWT_Secret)), 
                                                                SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token = token });
            }
            else
            {
                return BadRequest(new { message = "Incorrect username or password." });
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
