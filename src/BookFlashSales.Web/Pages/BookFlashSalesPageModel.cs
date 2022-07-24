using BookFlashSales.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace BookFlashSales.Web.Pages;

/* Inherit your PageModel classes from this class.
 */
public abstract class BookFlashSalesPageModel : AbpPageModel
{
    protected BookFlashSalesPageModel()
    {
        LocalizationResourceType = typeof(BookFlashSalesResource);
    }
}
