import type { ExtensibleFullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetRefundListInput extends PagedAndSortedResultRequestDto {
  paymentId?: string;
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
}
