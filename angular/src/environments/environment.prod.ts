import { Environment } from '@abp/ng.core';

const baseUrl = 'http://service-cibrylqe-1300453004.gz.apigw.tencentcs.com';

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
