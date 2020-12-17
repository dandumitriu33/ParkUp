using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ParkUp.Core.Entities;
using ParkUp.Core.Interfaces;
using ParkUp.Web.Controllers;
using ParkUp.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Tests.Shared;
using Xunit;

namespace Tests.Controller
{
    public class AccountControllerShould
    {
        private UserManager<ApplicationUser> userManager { get; }
        private SignInManager<ApplicationUser> signInManager { get; }
        private IAsyncRepository repository { get; }
        private IMapper mapper { get; }

        [Fact]
        public void RegisterGet_ReturnAViewResult()
        {
            // Arrange
            var controller = new AccountController(userManager, signInManager, repository, mapper);

            // Act
            var result = controller.Register();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
        }

        [Fact]
        public async Task RegisterPost_ReturnRedirectToActionHomeIndex()
        {
            // Arrange
            RegisterViewModel newRegisterVM = new RegisterViewModel();

            // mocking UserManager
            var mockUserManager = MockHelpers.MockUserManager<ApplicationUser>();
            mockUserManager.Setup(um => um.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success).Verifiable();

            // mocking SignInManager - no need to set up the method, just needs SignInManager to not be null
            var contextAccessor = new Mock<IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>();
            var mockSignInManager = new Mock<SignInManager<ApplicationUser>>(mockUserManager.Object,
                contextAccessor.Object, userPrincipalFactory.Object, null, null, null, null);

            var controller = new AccountController(mockUserManager.Object, mockSignInManager.Object, repository, mapper);

            // Act
            var result = await controller.Register(newRegisterVM);

            // Assert
            var requestResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", requestResult.ActionName);
            Assert.Equal("Home", requestResult.ControllerName);
            mockUserManager.Verify(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()), Times.Once);
        }

        [Fact]
        public async Task RegisterPost_ReturnErrorViewOnTryCatchFail()
        {
            // Arrange
            RegisterViewModel newRegisterVM = new RegisterViewModel();

            // mocking UserManager
            var mockUserManager = MockHelpers.MockUserManager<ApplicationUser>();
            // IdentityResult returned without Success
            mockUserManager.Setup(um => um.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).Throws(new Exception());

            // mocking SignInManager - no need to set up the method, just needs SignInManager to not be null
            var contextAccessor = new Mock<IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>();
            var mockSignInManager = new Mock<SignInManager<ApplicationUser>>(mockUserManager.Object,
                contextAccessor.Object, userPrincipalFactory.Object, null, null, null, null);

            var controller = new AccountController(mockUserManager.Object, mockSignInManager.Object, repository, mapper);

            // Act
            var result = await controller.Register(newRegisterVM);

            // Assert
            var badRequestResult = Assert.IsType<ViewResult>(result);
            Assert.Equal("Error", badRequestResult.ViewName);
        }

        [Fact]
        public async Task RegisterPost_ReturnsRegisterViewOnModelIsValidFalse()
        {
            // Arrange
            RegisterViewModel newRegisterVM = new RegisterViewModel();

            // mocking UserManager
            var mockUserManager = MockHelpers.MockUserManager<ApplicationUser>();
            mockUserManager.Setup(um => um.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success).Verifiable();

            // mocking SignInManager - no need to set up the method, just needs SignInManager to not be null
            var contextAccessor = new Mock<IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>();
            var mockSignInManager = new Mock<SignInManager<ApplicationUser>>(mockUserManager.Object,
                contextAccessor.Object, userPrincipalFactory.Object, null, null, null, null);

            var controller = new AccountController(mockUserManager.Object, mockSignInManager.Object, repository, mapper);
            controller.ModelState.AddModelError("Email", "Required");

            // Act
            var result = await controller.Register(newRegisterVM);

            // Assert
            var badRequestResult = Assert.IsType<ViewResult>(result);
            Assert.Equal("Register", badRequestResult.ViewName);
        }

        [Fact]
        public void LoginGet_ReturnAViewResult()
        {
            // Arrange
            var controller = new AccountController(userManager, signInManager, repository, mapper);

            // Act
            var result = controller.Login();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
        }

        [Fact]
        public async Task LoginPost_ReturnRedirectToActionHomeIndex()
        {
            // Arrange
            LoginViewModel newLogInVM = new LoginViewModel();

            // mocking UserManager
            var mockUserManager = MockHelpers.MockUserManager<ApplicationUser>();

            // mocking SignInManager
            var contextAccessor = new Mock<IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>();
            var mockSignInManager = new Mock<SignInManager<ApplicationUser>>(mockUserManager.Object,
                contextAccessor.Object, userPrincipalFactory.Object, null, null, null, null);
            mockSignInManager.Setup(sim => sim.PasswordSignInAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), false))
                             .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Success)
                             .Verifiable();

            var controller = new AccountController(mockUserManager.Object, mockSignInManager.Object, repository, mapper);

            // Act
            var result = await controller.Login(newLogInVM);

            // Assert
            var requestResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", requestResult.ActionName);
            Assert.Equal("Home", requestResult.ControllerName);
            mockSignInManager.Verify(x => x.PasswordSignInAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), false), Times.Once);
        }

        [Fact]
        public async Task LoginPost_ReturnLogInViewOnSignInFail()
        {
            // Arrange
            LoginViewModel newLogInVM = new LoginViewModel();

            // mocking UserManager
            var mockUserManager = MockHelpers.MockUserManager<ApplicationUser>();

            // mocking SignInManager
            var contextAccessor = new Mock<IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>();
            var mockSignInManager = new Mock<SignInManager<ApplicationUser>>(mockUserManager.Object,
                contextAccessor.Object, userPrincipalFactory.Object, null, null, null, null);
            mockSignInManager.Setup(sim => sim.PasswordSignInAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), false))
                             .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Failed)
                             .Verifiable();

            var controller = new AccountController(mockUserManager.Object, mockSignInManager.Object, repository, mapper);

            // Act
            var result = await controller.Login(newLogInVM);

            // Assert
            var requestResult = Assert.IsType<ViewResult>(result);
            Assert.Equal("Login", requestResult.ViewName);
            mockSignInManager.Verify(x => x.PasswordSignInAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), false), Times.Once);
        }

        [Fact]
        public async Task LoginPost_ReturnLoginViewOnModelIsInvalid()
        {
            // Arrange
            LoginViewModel newLogInVM = new LoginViewModel();

            // mocking UserManager
            var mockUserManager = MockHelpers.MockUserManager<ApplicationUser>();

            // mocking SignInManager
            var contextAccessor = new Mock<IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>();
            var mockSignInManager = new Mock<SignInManager<ApplicationUser>>(mockUserManager.Object,
                contextAccessor.Object, userPrincipalFactory.Object, null, null, null, null);
            mockSignInManager.Setup(sim => sim.PasswordSignInAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), false))
                             .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Success)
                             .Verifiable();

            var controller = new AccountController(mockUserManager.Object, mockSignInManager.Object, repository, mapper);
            controller.ModelState.AddModelError("Email", "Required");

            // Act
            var result = await controller.Login(newLogInVM);

            // Assert
            var requestResult = Assert.IsType<ViewResult>(result);
            Assert.Equal("Login", requestResult.ViewName);
            mockSignInManager.Verify(x => x.PasswordSignInAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), false), Times.Never);
        }

        [Fact]
        public async Task LoginPost_ReturnErrorViewOnSignInThrowError()
        {
            // Arrange
            LoginViewModel newLogInVM = new LoginViewModel();

            // mocking UserManager
            var mockUserManager = MockHelpers.MockUserManager<ApplicationUser>();

            // mocking SignInManager
            var contextAccessor = new Mock<IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>();
            var mockSignInManager = new Mock<SignInManager<ApplicationUser>>(mockUserManager.Object,
                contextAccessor.Object, userPrincipalFactory.Object, null, null, null, null);
            mockSignInManager.Setup(sim => sim.PasswordSignInAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), false))
                             .Throws(new Exception())
                             .Verifiable();

            var controller = new AccountController(mockUserManager.Object, mockSignInManager.Object, repository, mapper);

            // Act
            var result = await controller.Login(newLogInVM);

            // Assert
            var requestResult = Assert.IsType<ViewResult>(result);
            Assert.Equal("Error", requestResult.ViewName);
            mockSignInManager.Verify(x => x.PasswordSignInAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>(), false), Times.Once);
        }





    }
}
