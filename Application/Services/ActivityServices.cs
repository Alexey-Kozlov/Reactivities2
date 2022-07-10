using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Domain;
using Persistence;
using Application.Interfaces;
using Microsoft.Extensions.Logging;

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

        public async Task<List<Activity>> List()
        {
            _logger.LogInformation($"GetList");
            return await _context.Activity.ToListAsync();
        }

        public async Task<Activity> Details(Guid id)
        {
            return await _context.Activity.FindAsync(id);
        }

        public async Task Create(Activity activity)
        {
            if(activity.Id == Guid.Empty)
            {                
                activity.Id = new Guid();
            }
            await _context.Activity.AddAsync(activity);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> Edit(Activity activity)
        {
            Activity item = null;
            if((item = await Details(activity.Id)) == null)
            {
                return false;
            }
            _mapper.Map(activity, item);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> Delete(Guid Id)
        {
            Activity item = null;
            if ((item = await Details(Id)) == null)
            {
                return false;
            }
            _context.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
