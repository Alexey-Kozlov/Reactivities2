using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Interfaces;

namespace API.Controllers
{
    public class ActivityController:BaseApiController
    {
        private readonly IActivityService _activityService;

        public ActivityController(IActivityService activityService)
        {
            _activityService = activityService;
        }

        [HttpGet]
        [Route("GetActivity")]
        public async Task<IActionResult> GetActivity()
        {
            return HandleResult(await _activityService.List());
        }

        [HttpGet]
        [Route("GetActivity/{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {            
            return HandleResult(await _activityService.Details(id));
        }

        [HttpPost]
        [Route("CreateActivity")]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await _activityService.Create(activity));
        }

        [HttpPost]
        [Route("EditActivity/{id}")]
        public async Task<IActionResult> EditActivity(Activity activity, Guid id)
        {
            activity.Id = id;
            return HandleResult(await _activityService.Edit(activity));

        }
        [HttpPost]
        [Route("DeleteActivity/{id}")]
        public async Task<IActionResult> DeleteActivity( Guid id)
        {
            return HandleResult(await _activityService.Delete(id));
        }
    }
}
