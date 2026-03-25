using DevBoardBackend.Models.Domain;

namespace DevBoardBackend.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User> CreateAsync(User user);
        Task<List<User>> GetAllAsync();
    }
}               
