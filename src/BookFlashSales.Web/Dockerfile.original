FROM ccr.ccs.tencentyun.com/magicodes/aspnetcore-runtime:6.0
ENV ASPNETCORE_URLS=http://+:80
COPY ./publish /app
WORKDIR /app
CMD ["dotnet", "BookFlashSales.Web.dll"]