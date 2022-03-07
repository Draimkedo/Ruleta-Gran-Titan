
using Back_End;
using Back_End.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<RuletaContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnetionRuleta"));
});

builder.Services.AddCors(options => options.AddPolicy("AllowWebApp",
                                                      builder => builder.AllowAnyOrigin()
                                                                        .AllowAnyHeader()
                                                                        .AllowAnyMethod()));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowWebApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
