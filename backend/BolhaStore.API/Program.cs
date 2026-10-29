using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
var CORS = "frontendCors";

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: CORS,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference("scalar");
}

app.UseCors(CORS);
app.UseHttpsRedirection();
app.MapControllers();
app.Run();


