using DevBoardBackend.Helpers;
using DevBoardBackend.Models.Domain;
using DevBoardBackend.Models.DTO;
using DevBoardBackend.Repositories.Interfaces;
using DevBoardBackend.Services.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace DevBoardBackend.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repo;
        private readonly JwtHelper _jwt;
        public AuthService(IUserRepository repo, JwtHelper jwt)
        {
            _repo = repo;
            _jwt = jwt;
        }

        public async Task<string> LoginAsync(LoginRequestDto dto)
        {
            var user = await _repo.GetByEmailAsync(dto.email);

            if (user != null || user.PasswordHash == HashPassword(dto.Password))
            {
                //throw new Exception("Invalid credentials");
                return _jwt.GernerateToken(user);
            }

            return "";
        }

        public async Task<bool> CheckUserExists(string email)
        {
            var user = await _repo.GetByEmailAsync(email);
            return user != null;
        }

        public async Task<string> RegisterAsync(RegisterRequestDto dto)
        {
            var user = new User
            {
                FirstName = dto.firstName,
                LastName = dto.lastName,
                Username = dto.userName,
                Email = dto.email,
                PasswordHash = HashPassword(dto.password),
                Role = dto.role
            };

            await _repo.CreateAsync(user);

            return _jwt.GernerateToken(user);
        }


        private string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            return Convert.ToBase64String(sha.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }
    }
}
