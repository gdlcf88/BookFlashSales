import type { FlashSaleResultDto, FlashSaleResultGetListInput } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlashSaleResultService {
  apiName = 'EasyAbpEShopPluginsFlashSales';

  get = (id: string) =>
    this.restService.request<any, FlashSaleResultDto>({
      method: 'GET',
      url: `/api/e-shop/plugins/flash-sales/flash-sale-result/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: FlashSaleResultGetListInput) =>
    this.restService.request<any, PagedResultDto<FlashSaleResultDto>>({
      method: 'GET',
      url: '/api/e-shop/plugins/flash-sales/flash-sale-result',
      params: { storeId: input.storeId, planId: input.planId, status: input.status, userId: input.userId, orderId: input.orderId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount, extraProperties: input.extraProperties },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
