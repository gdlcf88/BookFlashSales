using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Volo.Abp;

namespace BookFlashSales;

public class BookFlashSalesWebTestStartup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddApplication<BookFlashSalesWebTestModule>();
    }

    public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
    {
        app.InitializeApplication();
    }
}
