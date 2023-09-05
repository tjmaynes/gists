using BlockFlixter.Data.SqlServer;
using BlockFlixter.Domain.Core.Mappings;
using BlockFlixter.Domain.Core.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Data.SqlClient;
using System.Reflection;
using System.Data;

namespace BlockFlixter.Shared.DependencyInjection;

public class ConfigureServices
{
    public static void Setup(IServiceCollection services)
    {
        services.AddAutoMapper(typeof(BlockFlixterProfile));

        services.AddTransient<IDbConnection>(db => new SqlConnection(
            Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING")));

        services.AddScoped<ICustomerRepository, DapperCustomerRepository>();
        services.AddScoped<IMovieInventoryRepository, DapperMovieInventoryRepository>();
        services.AddScoped<ICustomerRentalHistoryRepository, DapperCustomerRentalHistoryRepository>();

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
    }
}