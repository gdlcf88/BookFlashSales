using System.Threading.Tasks;
using Shouldly;
using Xunit;

namespace BookFlashSales.Pages;

public class Index_Tests : BookFlashSalesWebTestBase
{
    [Fact]
    public async Task Welcome_Page()
    {
        var response = await GetResponseAsStringAsync("/");
        response.ShouldNotBeNull();
    }
}
