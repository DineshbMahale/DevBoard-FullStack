using DevBoardBackend.Models.DTO;

namespace DevBoardBackend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterRequestDto dto);
        Task<string> LoginAsync(LoginRequestDto dto);
        Task<bool> CheckUserExists(RegisterRequestDto dto);
    }
}
