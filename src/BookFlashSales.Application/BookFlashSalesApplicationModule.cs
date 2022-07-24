using EasyAbp.EShop;
using EasyAbp.EShop.Orders.Plugins.FlashSales;
using EasyAbp.EShop.Plugins.FlashSales;
using EasyAbp.EShop.Products.Plugins.FlashSales;
using EasyAbp.PaymentService;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace BookFlashSales;

[DependsOn(
    typeof(BookFlashSalesDomainModule),
    typeof(AbpAccountApplicationModule),
    typeof(BookFlashSalesApplicationContractsModule),
    typeof(AbpIdentityApplicationModule),
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpTenantManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule),
    typeof(EShopApplicationModule),
    typeof(EShopPluginsFlashSalesApplicationModule),
    typeof(EShopOrdersPluginsFlashSalesApplicationModule),
    typeof(EShopProductsPluginsFlashSalesApplicationModule),
    typeof(PaymentServiceApplicationModule)
)]
public class BookFlashSalesApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<BookFlashSalesApplicationModule>();
        });
    }
}
