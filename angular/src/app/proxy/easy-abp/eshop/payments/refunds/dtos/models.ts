import type { ExtensibleFullAuditedEntityDto, ExtensibleObject, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { CreateEShopRefundItemInfoModel, RefundItemOrderExtraFeeEto } from '../models';

export interface CreateEShopRefundInput extends ExtensibleObject {
  paymentId?: string;
  displayReason?: string;
  customerRemark?: string;
  staffRemark?: string;
  refundItems: CreateEShopRefundItemInput[];
}

export interface CreateEShopRefundItemInput extends CreateEShopRefundItemInfoModel {
}

export interface GetRefundListDto extends PagedAndSortedResultRequestDto {
  userId?: string;
}

export interface RefundDto extends ExtensibleFullAuditedEntityDto<string> {
  paymentId?: string;
  refundPaymentMethod?: string;
  externalTradingCode?: string;
  currency?: string;
  refundAmount: number;
  displayReason?: string;
  customerRemark?: string;
  staffRemark?: string;
  completedTime?: string;
  canceledTime?: string;
  refundItems: RefundItemDto[];
}

export interface RefundItemDto extends ExtensibleFullAuditedEntityDto<string> {
  paymentItemId?: string;
  refundAmount: number;
  customerRemark?: string;
  staffRemark?: string;
  storeId?: string;
  orderId?: string;
  orderLines: RefundItemOrderLineDto[];
  orderExtraFees: RefundItemOrderExtraFeeEto[];
}

export interface RefundItemOrderLineDto {
  orderLineId?: string;
  refundedQuantity: number;
  refundAmount: number;
}
