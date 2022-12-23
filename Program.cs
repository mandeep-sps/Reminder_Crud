using DotNetCoreApp.Database;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();
var services = builder.Services;
services.AddDbContext<UserRg_DbContext>(Options =>
{
    Options.UseSqlServer(
    builder.Configuration.GetConnectionString("DotNetCrud"),
    sqlServerOptions => sqlServerOptions.CommandTimeout((int)TimeSpan.FromMinutes(10).TotalSeconds)
    );
});

services.AddScoped(typeof(IRepository), typeof(Repository));
services.AddSession();
services.AddMvc();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Login}/{action=Index}/{id?}");

app.Run();
