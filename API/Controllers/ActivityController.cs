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
        public async Task<ActionResult<List<Activity>>> GetActivity()
        {
            return await _activityService.List();
        }

        [HttpGet]
        [Route("GetActivity/{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _activityService.Details(id);
        }

        [HttpPost]
        [Route("CreateActivity")]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await _activityService.Create(activity);
            return Ok();
        }

        [HttpPost]
        [Route("EditActivity/{id}")]
        public async Task<IActionResult> EditActivity(Activity activity, Guid id)
        {
            activity.Id = id;
            if (await _activityService.Edit(activity))
            {
                return Ok();
            }
            else
            {
                return StatusCode(500);
            }
        }
        [HttpPost]
        [Route("DeleteActivity/{id}")]
        public async Task<IActionResult> DeleteActivity( Guid id)
        {
            if (await _activityService.Delete(id))
            {
                return Ok();
            }
            else
            {
                return StatusCode(500);
            }
        }
    }
}
