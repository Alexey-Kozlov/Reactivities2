using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        public RequestDelegate _request { get; }
        public ILogger<ExceptionMiddleware> _log { get; }
        public IHostEnvironment _env { get; }

        public ExceptionMiddleware(RequestDelegate request, ILogger<ExceptionMiddleware> log, IHostEnvironment env)
        {
            _request = request;
            _log = log;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _request(context);
            }
            catch(Exception e)
            {
                _log.LogError(e, e.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, e.Message, e.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Ошибка сервера");
                var jsonPolicy = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, jsonPolicy);
                await context.Response.WriteAsync(json);
            }
        }

    }
}
