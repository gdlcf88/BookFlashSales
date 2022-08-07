using System;
using System.Threading.Tasks;
using EasyAbp.EShop.Plugins.FlashSales.FlashSalePlans;
using Volo.Abp.DependencyInjection;

namespace BookFlashSales.Web;

[Dependency(ReplaceServices = true)]
[ExposeServices(typeof(MyFlashSalePlanHasher), typeof(FlashSalePlanHasher), typeof(IFlashSalePlanHasher))]
public class MyFlashSalePlanHasher : FlashSalePlanHasher
{
    public override Task<string> HashAsync(DateTime? planLastModificationTime, DateTime? productLastModificationTime,
        DateTime? productSkuLastModificationTime)
    {
        return Task.FromResult("my-token");
    }
}