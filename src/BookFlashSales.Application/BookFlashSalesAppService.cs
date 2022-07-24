using System;
using System.Collections.Generic;
using System.Text;
using BookFlashSales.Localization;
using Volo.Abp.Application.Services;

namespace BookFlashSales;

/* Inherit your application services from this class.
 */
public abstract class BookFlashSalesAppService : ApplicationService
{
    protected BookFlashSalesAppService()
    {
        LocalizationResource = typeof(BookFlashSalesResource);
    }
}
