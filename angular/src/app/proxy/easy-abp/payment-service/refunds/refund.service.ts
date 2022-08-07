import type { GetRefundListInput, RefundDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RefundService {
  apiName = 'EasyAbpPaymentService';

  get = (id: string) =>
    this.restService.request<any, RefundDto>({
      method: 'GET',
      url: `/api/payment-service/refund/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetRefundListInput) =>
    this.restService.request<any, PagedResultDto<RefundDto>>({
      method: 'GET',
      url: '/api/payment-service/refund',
      params: { paymentId: input.paymentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
