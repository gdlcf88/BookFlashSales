using Volo.Abp.Modularity;

namespace BookFlashSales;

[DependsOn(
    typeof(BookFlashSalesApplicationModule),
    typeof(BookFlashSalesDomainTestModule)
    )]
public class BookFlashSalesApplicationTestModule : AbpModule
{

}
