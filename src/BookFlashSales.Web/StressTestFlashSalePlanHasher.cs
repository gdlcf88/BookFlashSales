using System;
using System.Threading.Tasks;
using EasyAbp.EShop.Plugins.FlashSales.FlashSalePlans;
using Volo.Abp.DependencyInjection;

namespace BookFlashSales.Web;

[Dependency(TryRegister = true)]
[ExposeServices(typeof(StressTestFlashSalePlanHasher), typeof(FlashSalePlanHasher), typeof(IFlashSalePlanHasher))]
public class StressTestFlashSalePlanHasher : FlashSalePlanHasher
{
    public override Task<string> HashAsync(DateTime? planLastModificationTime, DateTime? productLastModificationTime,
        DateTime? productSkuLastModificationTime)
    {
        return Task.FromResult("my-token");
    }
}