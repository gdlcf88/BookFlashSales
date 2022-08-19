using System;
using System.Linq;
using System.Threading.Tasks;
using EasyAbp.EShop.Plugins.FlashSales.FlashSalePlans;
using EasyAbp.EShop.Products;
using EasyAbp.EShop.Products.Categories;
using EasyAbp.EShop.Products.Products;
using EasyAbp.EShop.Stores.Settings;
using EasyAbp.EShop.Stores.Stores;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using Volo.Abp.MultiTenancy;
using Volo.Abp.Settings;
using Volo.Abp.Uow;

namespace BookFlashSales.Data;

public class EShopDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly ICurrentTenant _currentTenant;
    private readonly IGuidGenerator _guidGenerator;
    private readonly ICategoryManager _categoryManager;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IProductManager _productManager;
    private readonly IProductRepository _productRepository;
    private readonly ISettingProvider _settingProvider;
    private readonly IStoreRepository _storeRepository;
    private readonly IAttributeOptionIdsSerializer _attributeOptionIdsSerializer;
    private readonly IFlashSalePlanRepository _flashSalePlanRepository;

    public EShopDataSeedContributor(
        ICurrentTenant currentTenant,
        IGuidGenerator guidGenerator,
        ICategoryManager categoryManager,
        ICategoryRepository categoryRepository,
        IProductManager productManager,
        IProductRepository productRepository,
        ISettingProvider settingProvider,
        IStoreRepository storeRepository,
        IAttributeOptionIdsSerializer attributeOptionIdsSerializer,
        IFlashSalePlanRepository flashSalePlanRepository)
    {
        _currentTenant = currentTenant;
        _guidGenerator = guidGenerator;
        _categoryManager = categoryManager;
        _categoryRepository = categoryRepository;
        _productManager = productManager;
        _productRepository = productRepository;
        _settingProvider = settingProvider;
        _storeRepository = storeRepository;
        _attributeOptionIdsSerializer = attributeOptionIdsSerializer;
        _flashSalePlanRepository = flashSalePlanRepository;
    }

    [UnitOfWork(true)]
    public virtual async Task SeedAsync(DataSeedContext context)
    {
        using var changeTenant = _currentTenant.Change(context.TenantId);

        await TryCreateCategoriesAsync();
        await TryCreateDefaultStoreAsync();
        await TryCreateProductsAsync();
        await TryCreateFlashSalePlansAsync();
    }

    private async Task TryCreateCategoriesAsync()
    {
        if (await _categoryRepository.AnyAsync(x => x.UniqueName == "Books"))
        {
            return;
        }

        var category = await _categoryManager.CreateAsync(null, "Books", "Books", null, null, false);

        await _categoryRepository.InsertAsync(category, true);
    }

    private async Task TryCreateDefaultStoreAsync()
    {
        var defaultStoreName = await _settingProvider.GetOrNullAsync(StoresSettings.DefaultStoreName);

        if (await _storeRepository.AnyAsync(x => x.Name == defaultStoreName))
        {
            return;
        }

        await _storeRepository.InsertAsync(
            new Store(_guidGenerator.Create(), _currentTenant.Id, defaultStoreName), true);
    }

    private async Task TryCreateProductsAsync()
    {
        var store = await _storeRepository.FindDefaultStoreAsync();

        if (await _productRepository.AnyAsync(x => x.StoreId == store.Id && x.UniqueName == "BookFlashSale"))
        {
            return;
        }

        var product = new Product(Guid.Parse("3a0580c5-cdaa-db74-3733-4d4d72354773"), _currentTenant.Id, store.Id,
            ProductsConsts.DefaultProductGroupName, null, "BookFlashSale", "ABP群友送书秒杀活动", InventoryStrategy.FlashSales,
            null, true, false, false, TimeSpan.FromMinutes(1), null, 0);

        var productAttribute = new ProductAttribute(_guidGenerator.Create(), "类型", null);
        var productAttributeOption = new ProductAttributeOption(_guidGenerator.Create(), "标准", null);

        productAttribute.ProductAttributeOptions.Add(productAttributeOption);
        product.ProductAttributes.Add(productAttribute);

        await _productManager.CreateAsync(product);

        var optionIds = await _attributeOptionIdsSerializer.SerializeAsync(
            productAttribute.ProductAttributeOptions.Select(x => x.Id));

        var sku = new ProductSku(Guid.Parse("3a0580c5-d0a2-f7cc-ee6c-313d59b4b61b"), optionIds, "normal", "CNY", null,
            0, 1, 1, null, null, null);

        await _productManager.CreateSkuAsync(product, sku);
    }

    private async Task TryCreateFlashSalePlansAsync()
    {
        var store = await _storeRepository.FindDefaultStoreAsync();

        var product = await _productRepository.GetAsync(x => x.StoreId == store.Id && x.UniqueName == "BookFlashSale");

        if (await _flashSalePlanRepository.AnyAsync(x => x.ProductId == product.Id))
        {
            return;
        }

        var beginTime = new DateTime(2022, 8, 9, 19, 30, 0);
        var endTime = new DateTime(2023, 8, 9, 19, 30, 0);

        var plan = await _flashSalePlanRepository.InsertAsync(new FlashSalePlan(
            new Guid("3a05957c-a91e-afbd-1e37-84cb004aa09b"), _currentTenant.Id, store.Id, beginTime, endTime,
            product.Id, product.ProductSkus.First(x => x.Name == "normal").Id, true));

        await _flashSalePlanRepository.InsertAsync(plan, true);
    }
}