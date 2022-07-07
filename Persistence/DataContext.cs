using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.Configurations;


namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DataContext()
        {
        }

        public DbSet<Activity> Activity { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new ActivityConfiguration());
        }
    }
}
