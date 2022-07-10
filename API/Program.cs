using API.Extentions;


var builder = WebApplication.CreateBuilder(args);
//Services
builder.Services.AddServices(builder);

//PipeLine
var app = builder.Build();
app.UseRouting();
app.UseCors("CorsPolicy");
app.UseAuthorization();
app.MapControllers();

app.Run();
