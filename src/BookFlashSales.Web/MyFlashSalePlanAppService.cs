using System;
using System.Threading.Tasks;
using EasyAbp.EShop.Plugins.FlashSales.FlashSalePlans;
using EasyAbp.EShop.Plugins.FlashSales.FlashSalePlans.Dtos;
using EasyAbp.EShop.Plugins.FlashSales.FlashSaleResults;
using EasyAbp.Eshop.Products.Products;
using EasyAbp.EShop.Products.Products;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Volo.Abp.Auditing;
using Volo.Abp.Caching;
using Volo.Abp.DependencyInjection;
using Volo.Abp.DistributedLocking;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.Uow;

namespace BookFlashSales.Web;

[DisableAuditing]
[Dependency(ReplaceServices = true)]
[ExposeServices(typeof(MyFlashSalePlanAppService), typeof(FlashSalePlanAppService),
    typeof(IFlashSalePlanAppService))]
public class MyFlashSalePlanAppService : FlashSalePlanAppService
{
    public MyFlashSalePlanAppService(IFlashSalePlanRepository flashSalePlanRepository,
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

    [UnitOfWork(IsDisabled = true)]
    public override Task<FlashSalePlanPreOrderDto> PreOrderAsync(Guid id)
    {
        return base.PreOrderAsync(id);
    }

    [UnitOfWork(IsDisabled = true)]
    public override Task<FlashSaleOrderResultDto> OrderAsync(Guid id, CreateOrderInput input)
    {
        return base.OrderAsync(id, input);
    }
}