using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BookFlashSales.Controllers;

[Route("current-user")]
public class CurrentUserController : BookFlashSalesController
{
    [HttpGet]
    [Route("id")]
    public Task<string> GetIdAsync()
    {
        return Task.FromResult(CurrentUser?.Id.ToString());
    }
}