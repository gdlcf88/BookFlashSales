using BookFlashSales.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace BookFlashSales.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class BookFlashSalesController : AbpControllerBase
{
    protected BookFlashSalesController()
    {
        LocalizationResource = typeof(BookFlashSalesResource);
    }
}
