using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Domain;
using Persistence;
using Application.Interfaces;
using Microsoft.Extensions.Logging;
using Application.Core;

namespace Application.Services
{
    public class ActivityServices: IActivityService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
        public ActivityServices(DataContext context, IMapper mapper, ILogger<ActivityServices> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<Result<List<Activity>>> List()
        {
            _logger.LogInformation($"GetList");
            var activities = await _context.Activity.ToListAsync();
            return Result<List<Activity>>.Success(activities);
        }

        public async Task<Result<Activity>> Details(Guid id)
        {
            var activity = await _context.Activity.FindAsync(id);
            return Result<Activity>.Success(activity);
        }

        public async Task<Result<object>> Create(Activity activity)
        {
            if(activity.Id == Guid.Empty)
            {                
                activity.Id = new Guid();
            }
            await _context.Activity.AddAsync(activity);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return Result<object>.Error("Ошибка создания записи");
            return Result<object>.Success("");
        }

        public async Task<Result<bool>> Edit(Activity activity)
        {
            var item = await Details(activity.Id);
            _mapper.Map(activity, item.Value);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return Result<bool>.Error("Ошибка редактирования записи");
            return Result<bool>.Success(true);
        }

        public async Task<Result<bool>> Delete(Guid Id)
        {
            var item = await Details(Id);
            _context.Remove(item.Value);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return Result<bool>.Error("Ошибка удаления записи");
            return Result<bool>.Success(true);
        }
    }
}
