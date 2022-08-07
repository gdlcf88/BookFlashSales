import { Environment } from '@abp/ng.core';

const baseUrl = 'http://flashsales.easyabp.io';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'BookFlashSales',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'http://flashsales.easyabp.io',
    redirectUri: baseUrl,
    clientId: 'BookFlashSales_App',
    responseType: 'password',
    scope: 'offline_access BookFlashSales',
    requireHttps: false
  },
  apis: {
    default: {
      url: 'http://flashsales.easyabp.io',
      rootNamespace: 'BookFlashSales',
    },
  },
} as Environment;
