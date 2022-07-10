using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Services;
using Application.Interfaces;
using Application;

namespace API.Extentions
{
    public static class ServiceExtentions
    {
        public static IServiceCollection AddServices(this IServiceCollection services, WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
            });
            builder.Services.AddControllers();
            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            builder.Services.AddTransient<IActivityService, ActivityServices>();
            builder.Services.AddAutoMapper(typeof(Mapping));
            return services;
        }
    }
}
