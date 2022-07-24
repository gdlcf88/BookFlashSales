using Volo.Abp.Settings;

namespace BookFlashSales.Settings;

public class BookFlashSalesSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(BookFlashSalesSettings.MySetting1));
    }
}
