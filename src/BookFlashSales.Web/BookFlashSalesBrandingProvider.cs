using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace BookFlashSales.Web;

[Dependency(ReplaceServices = true)]
public class BookFlashSalesBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "BookFlashSales";
}
