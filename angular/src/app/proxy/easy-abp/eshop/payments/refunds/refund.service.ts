import type { CreateEShopRefundInput, GetRefundListDto, RefundDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RefundService {
  apiName = 'EasyAbpEShopPayments';

  create = (input: CreateEShopRefundInput) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/e-shop/payments/refund',
      body: input,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, RefundDto>({
      method: 'GET',
      url: `/api/e-shop/payments/refund/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetRefundListDto) =>
    this.restService.request<any, PagedResultDto<RefundDto>>({
      method: 'GET',
      url: '/api/e-shop/payments/refund',
      params: { userId: input.userId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
