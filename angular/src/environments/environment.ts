import { Environment } from '@abp/ng.core';

const baseUrl = 'https://342l10t057.goho.co';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'BookFlashSales',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://342l10t057.goho.co',
    redirectUri: baseUrl,
    clientId: 'BookFlashSales_App',
    responseType: 'password',
    scope: 'offline_access BookFlashSales',
    requireHttps: false
  },
  apis: {
    default: {
      url: 'https://342l10t057.goho.co',
      rootNamespace: 'BookFlashSales',
    },
  },
} as Environment;
