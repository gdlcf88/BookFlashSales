using BookFlashSales.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace BookFlashSales;

[DependsOn(
    typeof(BookFlashSalesEntityFrameworkCoreTestModule)
    )]
public class BookFlashSalesDomainTestModule : AbpModule
{

}
