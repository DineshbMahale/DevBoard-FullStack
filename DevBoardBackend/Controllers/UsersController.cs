using DevBoardBackend.DTO;
using Microsoft.AspNetCore.Mvc;

namespace DevBoardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = new List<UserDto>
            {
                new UserDto{ Id = 1, Name = "Ram", Email = "ram@gmail.com", IsActive = true},
                new UserDto{ Id = 2, Name = "Sham", Email = "Sham@gmail.com", IsActive= false},
                new UserDto{ Id = 3, Name = "Geeta", Email = "geeta@gmail.com", IsActive = true }
            };

            return Ok(users);
        }
    }
}
