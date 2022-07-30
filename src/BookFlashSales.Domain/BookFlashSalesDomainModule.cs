using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using BookFlashSales.MultiTenancy;
using EasyAbp.EShop;
using EasyAbp.EShop.Plugins.FlashSales;
using EasyAbp.EShop.Products.DaprActorsInventory;
using EasyAbp.PaymentService;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Emailing;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.IdentityServer;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement.Identity;
using Volo.Abp.PermissionManagement.IdentityServer;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace BookFlashSales;

[DependsOn(
    typeof(BookFlashSalesDomainSharedModule),
    typeof(AbpAuditLoggingDomainModule),
    typeof(AbpBackgroundJobsDomainModule),
    typeof(AbpFeatureManagementDomainModule),
    typeof(AbpIdentityDomainModule),
    typeof(AbpPermissionManagementDomainIdentityModule),
    typeof(AbpIdentityServerDomainModule),
    typeof(AbpPermissionManagementDomainIdentityServerModule),
    typeof(AbpSettingManagementDomainModule),
    typeof(AbpTenantManagementDomainModule),
    typeof(AbpEmailingModule),
    typeof(EShopDomainModule),
    typeof(EShopPluginsFlashSalesDomainModule),
    typeof(EShopProductsDaprActorsInventoryDomainModule),
    typeof(PaymentServiceDomainModule)
)]
public class BookFlashSalesDomainModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpMultiTenancyOptions>(options =>
        {
            options.IsEnabled = MultiTenancyConsts.IsEnabled;
        });

#if DEBUG
        context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
#endif
    }
}
