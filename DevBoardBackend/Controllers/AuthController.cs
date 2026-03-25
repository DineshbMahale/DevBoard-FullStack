using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DevBoardBackend.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using DevBoardBackend.Models.Domain;
using DevBoardBackend.Services.Interfaces;
using DevBoardBackend.Models.DTO;
using Microsoft.AspNetCore.Identity;

namespace DevBoardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _service;
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config, IAuthService service)
        {
            _config = config;
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto dto)
        {
            var userExists = await _service.CheckUserExists(dto.email);

            if (userExists)
            {
                return Conflict(new { message = "User already exists with this email." });
            }

            var token = await _service.RegisterAsync(dto);

            return Ok(new { token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto dto)
        {
            var userExist = await _service.CheckUserExists(dto.email);
            if (!userExist)
            {
                return Unauthorized(new { message = "Invalid email or password. Please try again." });
            }

            var token = await _service.LoginAsync(dto);
            return Ok(new { token });
        }
        


        //[Authorize(Roles = "Admin")]
        //[HttpGet("admin-data")]
        //public IActionResult GetAdminData()
        //{
        //    return Ok("Only Admin can access this data !!");
        //}

        //[Authorize(Roles = "User,Admin")]
        //[HttpGet("user-data")]
        //public IActionResult GetUserData()
        //{
        //    return Ok("User or Admin can access !!");
        //}
    }
}
