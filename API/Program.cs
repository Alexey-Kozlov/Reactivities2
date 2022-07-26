using API.Extentions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);
//Сервисы
builder.Services.AddServices(builder);

//PipeLine
var app = builder.Build();
//Отлов ошибок
app.UseMiddleware<ExceptionMiddleware>();
app.UseRouting();
app.UseCors("CorsPolicy");
app.UseAuthorization();
app.MapControllers();

app.Run();
