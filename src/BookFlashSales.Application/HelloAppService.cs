using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Auditing;
using Volo.Abp.Caching;
using DistributedCacheEntryOptions = Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions;

namespace BookFlashSales;

public class HelloAppService : BookFlashSalesAppService
{
    [HttpGet]
    public virtual Task<string> PingAsync() => Task.FromResult("pong");

    [DisableAuditing]
    public virtual async Task<string> SetCacheAsync()
    {
        var cache = LazyServiceProvider.LazyGetRequiredService<IDistributedCache<string>>();

        await cache.SetAsync(GuidGenerator.Create().ToString(), "value", new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(30)
        });

        return "ok";
    }
}