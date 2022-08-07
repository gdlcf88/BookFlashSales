import type { ExtensibleEntityDto, ExtensibleFullAuditedEntityDto } from '@abp/ng.core';

export interface ExtensiblePagedAndSortedResultRequestDto extends ExtensibleEntityDto {
  sorting: string;
  skipCount: number;
  maxResultCount: number;
}

export interface CreateOrderInput extends ExtensibleEntityDto {
  customerRemark?: string;
}

export interface FlashSaleOrderResultDto extends ExtensibleEntityDto {
  isSuccess: boolean;
  flashSaleResultId?: string;
}

export interface FlashSalePlanCreateDto extends ExtensibleEntityDto {
  storeId?: string;
  beginTime?: string;
  endTime?: string;
  productId?: string;
  productSkuId?: string;
  isPublished: boolean;
}

export interface FlashSalePlanDto extends ExtensibleFullAuditedEntityDto<string> {
  storeId?: string;
  beginTime?: string;
  endTime?: string;
  productId?: string;
  productSkuId?: string;
  isPublished: boolean;
  concurrencyStamp?: string;
}

export interface FlashSalePlanGetListInput extends ExtensiblePagedAndSortedResultRequestDto {
  storeId?: string;
  productId?: string;
  productSkuId?: string;
  includeUnpublished: boolean;
  start?: string;
  end?: string;
}

export interface FlashSalePlanPreOrderDto extends ExtensibleEntityDto {
  expiresTime?: string;
  expiresInSeconds: number;
}

export interface FlashSalePlanUpdateDto extends ExtensibleEntityDto {
  beginTime?: string;
  endTime?: string;
  productId?: string;
  productSkuId?: string;
  isPublished: boolean;
  concurrencyStamp?: string;
}
