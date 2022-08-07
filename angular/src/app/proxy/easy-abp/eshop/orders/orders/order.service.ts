import type { CancelOrderInput, CreateOrderDto, GetOrderListDto, OrderDto, UpdateStaffRemarkInput } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiName = 'EasyAbpEShopOrders';

  cancel = (id: string, input: CancelOrderInput) =>
    this.restService.request<any, OrderDto>({
      method: 'POST',
      url: `/api/e-shop/orders/order/${id}/cancel`,
      body: input,
    },
    { apiName: this.apiName });

  complete = (id: string) =>
    this.restService.request<any, OrderDto>({
      method: 'POST',
      url: `/api/e-shop/orders/order/${id}/complete`,
    },
    { apiName: this.apiName });

  create = (input: CreateOrderDto) =>
    this.restService.request<any, OrderDto>({
      method: 'POST',
      url: '/api/e-shop/orders/order',
      body: input,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, OrderDto>({
      method: 'GET',
      url: `/api/e-shop/orders/order/${id}`,
    },
    { apiName: this.apiName });

  getByOrderNumber = (orderNumber: string) =>
    this.restService.request<any, OrderDto>({
      method: 'GET',
      url: `/api/e-shop/orders/order/by-order-number/${orderNumber}`,
    },
    { apiName: this.apiName });

  getList = (input: GetOrderListDto) =>
    this.restService.request<any, PagedResultDto<OrderDto>>({
      method: 'GET',
      url: '/api/e-shop/orders/order',
      params: { storeId: input.storeId, customerUserId: input.customerUserId, maxResultCount: input.maxResultCount, sorting: input.sorting, skipCount: input.skipCount },
    },
    { apiName: this.apiName });

  updateStaffRemark = (id: string, input: UpdateStaffRemarkInput) =>
    this.restService.request<any, OrderDto>({
      method: 'PUT',
      url: `/api/e-shop/orders/order/${id}/staff-remark`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
