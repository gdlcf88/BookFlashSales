import type { GetPaymentListInput, PayInput, PaymentDto, PaymentMethodDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EasyAbpPaymentService {
  apiName = 'EasyAbpPaymentService';

  cancel = (id: string) =>
    this.restService.request<any, PaymentDto>({
      method: 'POST',
      url: `/api/payment-service/payment/${id}/cancel`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, PaymentDto>({
      method: 'GET',
      url: `/api/payment-service/payment/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetPaymentListInput) =>
    this.restService.request<any, PagedResultDto<PaymentDto>>({
      method: 'GET',
      url: '/api/payment-service/payment',
      params: { userId: input.userId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getListPaymentMethod = () =>
    this.restService.request<any, ListResultDto<PaymentMethodDto>>({
      method: 'GET',
      url: '/api/payment-service/payment/payment-method',
    },
    { apiName: this.apiName });

  pay = (id: string, input: PayInput) =>
    this.restService.request<any, PaymentDto>({
      method: 'POST',
      url: `/api/payment-service/payment/${id}/pay`,
      body: input,
    },
    { apiName: this.apiName });

  refundRollback = (id: string) =>
    this.restService.request<any, PaymentDto>({
      method: 'POST',
      url: `/api/payment-service/payment/${id}/refund/rollback`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
