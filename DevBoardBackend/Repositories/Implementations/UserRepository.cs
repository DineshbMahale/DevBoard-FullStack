using DevBoardBackend.Data;
using DevBoardBackend.Models.Domain;
using DevBoardBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevBoardBackend.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<User> CreateAsync(User user)
        {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return user;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }
    }

}