using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BookFlashSales.Data;
using Volo.Abp.DependencyInjection;

namespace BookFlashSales.EntityFrameworkCore;

public class EntityFrameworkCoreBookFlashSalesDbSchemaMigrator
    : IBookFlashSalesDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreBookFlashSalesDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the BookFlashSalesDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<BookFlashSalesDbContext>()
            .Database
            .MigrateAsync();
    }
}
