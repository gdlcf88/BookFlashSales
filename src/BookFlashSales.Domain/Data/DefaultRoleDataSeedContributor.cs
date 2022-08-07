using System.Threading.Tasks;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Guids;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement;
using Volo.Abp.Uow;

namespace BookFlashSales.Data;

public class DefaultRoleDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IGuidGenerator _guidGenerator;
    private readonly ICurrentTenant _currentTenant;
    private readonly IdentityRoleManager _identityRoleManager;
    private readonly PermissionManager _permissionManager;

    public DefaultRoleDataSeedContributor(
        IGuidGenerator guidGenerator,
        ICurrentTenant currentTenant,
        IdentityRoleManager identityRoleManager,
        PermissionManager permissionManager)
    {
        _guidGenerator = guidGenerator;
        _currentTenant = currentTenant;
        _identityRoleManager = identityRoleManager;
        _permissionManager = permissionManager;
    }

    [UnitOfWork(true)]
    public virtual async Task SeedAsync(DataSeedContext context)
    {
        using var changeTenant = _currentTenant.Change(context.TenantId);

        if (await _identityRoleManager.FindByNameAsync("default") is null)
        {
            var role = new IdentityRole(_guidGenerator.Create(), "default", context.TenantId)
            {
                IsDefault = true,
                IsPublic = true
            };

            await _identityRoleManager.CreateAsync(role);
        }

        var permissions = new[]
        {
            "EasyAbp.EShop.Orders.Order",
            "EasyAbp.EShop.Orders.Order.Create",
            "EasyAbp.EShop.Orders.Order.Cancel",
            "EasyAbp.EShop.Payments.Payment",
            "EasyAbp.EShop.Payments.Payment.Create",
            "EasyAbp.EShop.Plugins.FlashSales.FlashSalePlan",
            "EasyAbp.EShop.Plugins.FlashSales.FlashSalePlan.PreOrder",
            "EasyAbp.EShop.Plugins.FlashSales.FlashSaleResult"
        };

        foreach (var permission in permissions)
        {
            await _permissionManager.SetAsync(permission, RolePermissionValueProvider.ProviderName, "default", true);
        }
    }
}