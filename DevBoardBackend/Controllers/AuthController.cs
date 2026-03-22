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
            var userExists = await _service.CheckUserExists(dto);

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
            var token = await _service.LoginAsync(dto);
            return Ok(new { token });
        }
        //creating a demo user list 
        //List<User> users = new List<User>()
        //{
        //     new User{ Id=1, FirstName="Admin", LastName="Raja", Email="admin@gmail.com", Username="admin", Password="123456", Role="Admin"},
        //     new User{ Id=2, FirstName="User", LastName="Bhai", Email="user@gmail.com", Username="user", Password="123456R", Role="User"}

        //};


        //[HttpPost("signin")]
        //public IActionResult SignIn([FromBody] LoginRequest request)
        //{

        //    var user = users.FirstOrDefault(u => u.Email == request.Email && u.Password == request.Password);

        //    if(user == null)
        //    {
        //        return Unauthorized("Invalid Credentials");
        //    }

        //        var token = GenerateJwtToken(user);
        //        return Ok(new
        //        {
        //            token = token,
        //            role = user.Role
        //        }); 
        //}

        //private string GenerateJwtToken(User user)
        //{
        //    var jwtSettings = _config.GetSection("Jwt");

        //    var key = new SymmetricSecurityKey(
        //            Encoding.UTF8.GetBytes(jwtSettings["Key"]));

        //    var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //    var claims = new[]
        //    {
        //        new Claim(ClaimTypes.Name, user.Username),
        //        new Claim(ClaimTypes.Role, user.Role)
        //    };

        //    var token = new JwtSecurityToken(
        //        issuer: jwtSettings["Issuer"],
        //        audience: jwtSettings["Audience"],
        //        claims: claims,

        //        expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["DurationInMinutes"])),

        //        signingCredentials: cred

        //        );

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}



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
