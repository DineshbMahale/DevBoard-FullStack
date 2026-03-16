using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DevBoardBackend.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace DevBoardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        
        public AuthController(IConfiguration config)
        {
            _config = config;
        }


        //creating a demo user list 
        //creating a demo user list 
        List<User> users = new List<User>()
        {
             new User{ Id=1, Username="admin", Password="1234", Role="Admin"},
             new User{ Id=2, Username="user", Password="1234", Role="User"}
        };


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {

            var user = users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);

            if(user == null)
            {
                return Unauthorized("Invalid Credentials");
            }
           
                var token = GenerateJwtToken(user);
                return Ok(new
                {
                    token = token,
                    role = user.Role
                }); 
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _config.GetSection("Jwt");

            var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtSettings["Key"]));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,

                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["DurationInMinutes"])),

                signingCredentials: cred

                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        [Authorize(Roles = "Admin")]
        [HttpGet("admin-data")]
        public IActionResult GetAdminData()
        {
            return Ok("Only Admin can access this data !!");
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet("user-data")]
        public IActionResult GetUserData()
        {
            return Ok("User or Admin can access !!");
        }
    }
}
