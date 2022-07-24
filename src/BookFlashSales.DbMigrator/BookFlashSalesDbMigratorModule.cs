using BookFlashSales.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BookFlashSales.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(BookFlashSalesEntityFrameworkCoreModule),
    typeof(BookFlashSalesApplicationContractsModule)
    )]
public class BookFlashSalesDbMigratorModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
    }
}
