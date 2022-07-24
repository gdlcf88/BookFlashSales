using Localization.Resources.AbpUi;
using BookFlashSales.Localization;
using EasyAbp.EShop;
using EasyAbp.EShop.Plugins.FlashSales;
using EasyAbp.PaymentService;
using Volo.Abp.Account;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.HttpApi;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace BookFlashSales;

[DependsOn(
    typeof(BookFlashSalesApplicationContractsModule),
    typeof(AbpAccountHttpApiModule),
    typeof(AbpIdentityHttpApiModule),
    typeof(AbpPermissionManagementHttpApiModule),
    typeof(AbpTenantManagementHttpApiModule),
    typeof(AbpFeatureManagementHttpApiModule),
    typeof(AbpSettingManagementHttpApiModule),
    typeof(EShopHttpApiModule),
    typeof(EShopPluginsFlashSalesHttpApiModule),
    typeof(PaymentServiceHttpApiModule)
)]
public class BookFlashSalesHttpApiModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        ConfigureLocalization();
    }

    private void ConfigureLocalization()
    {
        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Get<BookFlashSalesResource>()
                .AddBaseTypes(
                    typeof(AbpUiResource)
                );
        });
    }
}
