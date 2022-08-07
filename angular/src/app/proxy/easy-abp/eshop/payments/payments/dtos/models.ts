import type { ExtensibleFullAuditedEntityDto, ExtensibleObject, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreatePaymentDto extends ExtensibleObject {
  paymentMethod?: string;
  orderIds: string[];
}

export interface GetPaymentListDto extends PagedAndSortedResultRequestDto {
  userId?: string;
}

export interface PaymentDto extends ExtensibleFullAuditedEntityDto<string> {
  userId?: string;
  paymentMethod?: string;
  payeeAccount?: string;
  externalTradingCode?: string;
  currency?: string;
  originalPaymentAmount: number;
  paymentDiscount: number;
  actualPaymentAmount: number;
  refundAmount: number;
  pendingRefundAmount: number;
  completionTime?: string;
  canceledTime?: string;
  paymentItems: PaymentItemDto[];
}

export interface PaymentItemDto extends ExtensibleFullAuditedEntityDto<string> {
  itemType?: string;
  itemKey?: string;
  originalPaymentAmount: number;
  paymentDiscount: number;
  actualPaymentAmount: number;
  refundAmount: number;
  pendingRefundAmount: number;
  storeId?: string;
}
