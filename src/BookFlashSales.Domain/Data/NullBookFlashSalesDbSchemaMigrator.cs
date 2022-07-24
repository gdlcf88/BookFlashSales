using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BookFlashSales.Data;

/* This is used if database provider does't define
 * IBookFlashSalesDbSchemaMigrator implementation.
 */
public class NullBookFlashSalesDbSchemaMigrator : IBookFlashSalesDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
