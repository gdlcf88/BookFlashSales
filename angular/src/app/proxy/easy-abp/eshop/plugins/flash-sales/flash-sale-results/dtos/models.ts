import { ExtensibleEntityDto, ExtensibleFullAuditedEntityDto } from '@abp/ng.core';
import type { FlashSaleResultStatus } from '../flash-sale-result-status.enum';

export interface ExtensiblePagedAndSortedResultRequestDto extends ExtensibleEntityDto {
  sorting: string;
  skipCount: number;
  maxResultCount: number;
}
export interface FlashSaleResultDto extends ExtensibleFullAuditedEntityDto<string> {
  storeId?: string;
  planId?: string;
  status: FlashSaleResultStatus;
  reason?: string;
  userId?: string;
  orderId?: string;
}

export interface FlashSaleResultGetListInput extends ExtensiblePagedAndSortedResultRequestDto {
  storeId?: string;
  planId?: string;
  status?: FlashSaleResultStatus;
  userId?: string;
  orderId?: string;
}
