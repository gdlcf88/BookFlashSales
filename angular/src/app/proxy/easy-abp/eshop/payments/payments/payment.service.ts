import type { CreatePaymentDto, GetPaymentListDto, PaymentDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EasyAbpEShopPayments {
  apiName = 'EasyAbpEShopPayments';

  create = (input: CreatePaymentDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/e-shop/payments/payment',
      body: input,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, PaymentDto>({
      method: 'GET',
      url: `/api/e-shop/payments/payment/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetPaymentListDto) =>
    this.restService.request<any, PagedResultDto<PaymentDto>>({
      method: 'GET',
      url: '/api/e-shop/payments/payment',
      params: { userId: input.userId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
