using API.Extentions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);
//Services
builder.Services.AddServices(builder);

//PipeLine
var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
app.UseRouting();
app.UseCors("CorsPolicy");
app.UseAuthorization();
app.MapControllers();

app.Run();
