﻿using EasyAbp.EShop;
using EasyAbp.EShop.Plugins.FlashSales;
using EasyAbp.PaymentService;
using Volo.Abp.Account;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.ObjectExtending;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace BookFlashSales;

[DependsOn(
    typeof(BookFlashSalesDomainSharedModule),
    typeof(AbpAccountApplicationContractsModule),
    typeof(AbpFeatureManagementApplicationContractsModule),
    typeof(AbpIdentityApplicationContractsModule),
    typeof(AbpPermissionManagementApplicationContractsModule),
    typeof(AbpSettingManagementApplicationContractsModule),
    typeof(AbpTenantManagementApplicationContractsModule),
    typeof(AbpObjectExtendingModule),
    typeof(EShopApplicationContractsModule),
    typeof(EShopPluginsFlashSalesApplicationContractsModule),
    typeof(PaymentServiceApplicationContractsModule)
)]
public class BookFlashSalesApplicationContractsModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        BookFlashSalesDtoExtensions.Configure();
    }
}
