import type { CreateOrderInput, FlashSaleOrderResultDto, FlashSalePlanCreateDto, FlashSalePlanDto, FlashSalePlanGetListInput, FlashSalePlanPreOrderDto, FlashSalePlanUpdateDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlashSalePlanService {
  apiName = 'EasyAbpEShopPluginsFlashSales';

  create = (id: string, input: FlashSalePlanCreateDto) =>
    this.restService.request<any, FlashSalePlanDto>({
      method: 'POST',
      url: `/api/e-shop/plugins/flash-sales/flash-sale-plan/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/e-shop/plugins/flash-sales/flash-sale-plan/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, FlashSalePlanDto>({
      method: 'GET',
      url: `/api/e-shop/plugins/flash-sales/flash-sale-plan/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: FlashSalePlanGetListInput) =>
    this.restService.request<any, PagedResultDto<FlashSalePlanDto>>({
      method: 'GET',
      url: '/api/e-shop/plugins/flash-sales/flash-sale-plan',
      params: { storeId: input.storeId, productId: input.productId, productSkuId: input.productSkuId, includeUnpublished: input.includeUnpublished, start: input.start, end: input.end, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount, extraProperties: input.extraProperties },
    },
    { apiName: this.apiName });

  order = (id: string, input: CreateOrderInput) =>
    this.restService.request<any, FlashSaleOrderResultDto>({
      method: 'POST',
      url: `/api/e-shop/plugins/flash-sales/flash-sale-plan/${id}/order`,
      body: input,
    },
    { apiName: this.apiName });

  preOrder = (id: string) =>
    this.restService.request<any, FlashSalePlanPreOrderDto>({
      method: 'POST',
      url: `/api/e-shop/plugins/flash-sales/flash-sale-plan/${id}/pre-order`,
    },
    { apiName: this.apiName });

  update = (id: string, input: FlashSalePlanUpdateDto) =>
    this.restService.request<any, FlashSalePlanDto>({
      method: 'PUT',
      url: `/api/e-shop/plugins/flash-sales/flash-sale-plan/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
