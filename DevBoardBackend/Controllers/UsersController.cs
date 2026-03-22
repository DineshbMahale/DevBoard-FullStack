using DevBoardBackend.Models.DTO;
using DevBoardBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevBoardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;

        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var users = await _repo.GetAllAsync();
            return Ok(users);
        }

        //[HttpGet]
        //public IActionResult GetUsers()
        //{
        //    var users = new List<UserDto>
        //    {
        //        new UserDto{ Id = 1, Name = "Ram", Email = "ram@gmail.com", IsActive = true},
        //        new UserDto{ Id = 2, Name = "Sham", Email = "Sham@gmail.com", IsActive= false},
        //        new UserDto{ Id = 3, Name = "Geeta", Email = "geeta@gmail.com", IsActive = true }
        //    };

        //    return Ok(users);
        //}
    }
}
