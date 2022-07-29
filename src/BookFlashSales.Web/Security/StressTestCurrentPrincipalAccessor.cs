using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Volo.Abp.AspNetCore.Security.Claims;
using Volo.Abp.Security.Claims;

namespace BookFlashSales.Web.Security;

public class StressTestCurrentPrincipalAccessor : HttpContextCurrentPrincipalAccessor
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public StressTestCurrentPrincipalAccessor(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    protected override ClaimsPrincipal GetClaimsPrincipal()
    {
        if (_httpContextAccessor.HttpContext is null ||
            !_httpContextAccessor.HttpContext.Request.Headers.TryGetValue("user-id", out var userIdHeaders))
        {
            return base.GetClaimsPrincipal();
        }

        var userId = userIdHeaders.First();

        Guid.Parse(userId);

        return new ClaimsPrincipal(
            new ClaimsIdentity(
                new List<Claim>
                {
                    new(AbpClaimTypes.UserId, userId),
                    new(AbpClaimTypes.UserName, userId),
                    new(AbpClaimTypes.Email, $"{userId}@fake-mail.com")
                }
            )
        );
    }
}