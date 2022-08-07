import { Environment } from '@abp/ng.core';

const baseUrl = 'https://localhost:44330';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'BookFlashSales',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44330',
    redirectUri: baseUrl,
    clientId: 'BookFlashSales_App',
    responseType: 'password',
    scope: 'offline_access BookFlashSales',
    requireHttps: false
  },
  apis: {
    default: {
      url: 'https://localhost:44330',
      rootNamespace: 'BookFlashSales',
    },
  },
} as Environment;
