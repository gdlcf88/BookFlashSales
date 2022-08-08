using System;
using System.Threading.Tasks;
using EasyAbp.EShop.Plugins.FlashSales.FlashSalePlans;
using EasyAbp.EShop.Plugins.FlashSales.FlashSalePlans.Dtos;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Uow;

namespace BookFlashSales.Web;

[Dependency(ReplaceServices = true)]
[ExposeServices(typeof(MyFlashSalePlanController), typeof(FlashSalePlanController))]
public class MyFlashSalePlanController : FlashSalePlanController
{
    public MyFlashSalePlanController(IFlashSalePlanAppService flashSalePlanAppService) : base(flashSalePlanAppService)
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