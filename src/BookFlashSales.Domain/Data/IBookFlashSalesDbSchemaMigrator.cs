using System.Threading.Tasks;

namespace BookFlashSales.Data;

public interface IBookFlashSalesDbSchemaMigrator
{
    Task MigrateAsync();
}
