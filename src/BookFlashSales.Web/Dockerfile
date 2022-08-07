#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
ENV TZ=Asia/Shanghai
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["common.props", "."]
COPY ["Directory.Build.props", "."]
COPY ["src/BookFlashSales.Web/BookFlashSales.Web.csproj", "src/BookFlashSales.Web/"]
COPY ["src/BookFlashSales.Application/BookFlashSales.Application.csproj", "src/BookFlashSales.Application/"]
COPY ["src/BookFlashSales.Domain/BookFlashSales.Domain.csproj", "src/BookFlashSales.Domain/"]
COPY ["src/BookFlashSales.Domain.Shared/BookFlashSales.Domain.Shared.csproj", "src/BookFlashSales.Domain.Shared/"]
COPY ["src/BookFlashSales.Application.Contracts/BookFlashSales.Application.Contracts.csproj", "src/BookFlashSales.Application.Contracts/"]
COPY ["src/BookFlashSales.HttpApi/BookFlashSales.HttpApi.csproj", "src/BookFlashSales.HttpApi/"]
COPY ["src/BookFlashSales.EntityFrameworkCore/BookFlashSales.EntityFrameworkCore.csproj", "src/BookFlashSales.EntityFrameworkCore/"]


RUN dotnet restore "src/BookFlashSales.Web/BookFlashSales.Web.csproj"
COPY . .
WORKDIR "/src/src/BookFlashSales.Web"
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
&& apt install nodejs -y


RUN dotnet tool install  --tool-path /dotnetcore-tools volo.abp.cli 
ENV PATH="/dotnetcore-tools:${PATH}"
RUN abp install-libs  "BookFlashSales.Web.csproj"
RUN dotnet build "BookFlashSales.Web.csproj" -c Release -o /app/build


FROM build AS publish
RUN dotnet publish "BookFlashSales.Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BookFlashSales.Web.dll"]
