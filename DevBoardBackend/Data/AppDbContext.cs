using DevBoardBackend.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace DevBoardBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) 
        {

        }
        public DbSet<User> Users { get; set; }
    }
}
