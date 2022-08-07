using System;
using System.Threading.Tasks;
using EasyAbp.EShop.Plugins.FlashSales.FlashSalePlans;
using EasyAbp.EShop.Plugins.FlashSales.FlashSaleResults;
using EasyAbp.EShop.Products.DaprActorsInventory;
using EasyAbp.Eshop.Products.Products;
using EasyAbp.EShop.Products.Products;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Volo.Abp.Caching;
using Volo.Abp.DependencyInjection;
using Volo.Abp.DistributedLocking;
using Volo.Abp.EventBus.Distributed;

namespace BookFlashSales.Web;

[Dependency(TryRegister = true)]
[ExposeServices(typeof(StressTestFlashSalePlanAppService), typeof(FlashSalePlanAppService),
    typeof(IFlashSalePlanAppService))]
public class StressTestFlashSalePlanAppService : FlashSalePlanAppService
{
    public StressTestFlashSalePlanAppService(IFlashSalePlanRepository flashSalePlanRepository,
        IProductAppService productAppService, IDistributedCache<FlashSalePlanPreOrderCacheItem> tokenDistributedCache,
        IDistributedCache<FlashSalePlanCacheItem, Guid> planDistributedCache,
        IDistributedCache<ProductCacheItem, Guid> productDistributedCache, IDistributedEventBus distributedEventBus,
        IFlashSaleResultRepository flashSaleResultRepository, IAbpDistributedLock distributedLock,
        IFlashSalePlanHasher flashSalePlanHasher, IFlashSaleInventoryManager flashSaleInventoryManager,
        IDistributedCache distributedCache, IOptionsMonitor<FlashSalesOptions> optionsMonitor) : base(
        flashSalePlanRepository, productAppService, tokenDistributedCache, planDistributedCache,
        productDistributedCache, distributedEventBus, flashSaleResultRepository, distributedLock, flashSalePlanHasher,
        flashSaleInventoryManager, distributedCache, optionsMonitor)
    {
    }

    protected override async Task<FlashSalePlanPreOrderCacheItem> GetPreOrderCacheAsync(Guid planId)
    {
        return await base.GetPreOrderCacheAsync(planId) ?? new FlashSalePlanPreOrderCacheItem
        {
            TenantId = null,
            HashToken = "my-token",
            PlanId = planId,
            ProductId = Guid.Parse("3a0580c5-cdaa-db74-3733-4d4d72354773"),
            ProductSkuId = Guid.Parse("3a0580c5-d0a2-f7cc-ee6c-313d59b4b61b"),
            InventoryProviderName = DaprActorsProductInventoryProvider.DaprActorsProductInventoryProviderName
        }; // for stress tests
    }
}