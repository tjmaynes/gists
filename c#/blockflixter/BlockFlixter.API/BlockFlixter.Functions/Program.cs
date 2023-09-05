using Microsoft.Extensions.Hosting;
using BlockFlixter.Shared.DependencyInjection;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(s => ConfigureServices.Setup(s))
    .Build();

await host.RunAsync();
