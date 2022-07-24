using Microsoft.AspNetCore.Mvc;
using Application.Core;

namespace API.Controllers
{
    [ApiController]
    [Route("api")]
    public class BaseApiController:ControllerBase
    {
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if(result == null) return NotFound(); 
            if (result.IsSuccess && result.Value != null) return Ok(result.Value);
            if (result.IsSuccess && result.Value == null) return NotFound();
            return BadRequest(result.ErrorText);
        }
    }
}
