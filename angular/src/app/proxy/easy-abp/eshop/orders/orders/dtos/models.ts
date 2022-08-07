import type { ExtensibleFullAuditedEntityDto, ExtensibleObject, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { OrderStatus } from '../order-status.enum';

export interface CancelOrderInput {
  cancellationReason?: string;
}

export interface CreateOrderDto extends ExtensibleObject {
  storeId?: string;
  customerRemark?: string;
  orderLines: CreateOrderLineDto[];
}

export interface CreateOrderLineDto extends ExtensibleObject {
  productId?: string;
  productSkuId?: string;
  quantity: number;
}

export interface GetOrderListDto extends PagedAndSortedResultRequestDto {
  storeId?: string;
  customerUserId?: string;
  maxResultCount: number;
}

export interface OrderDto extends ExtensibleFullAuditedEntityDto<string> {
  storeId?: string;
  orderNumber?: string;
  customerUserId?: string;
  orderStatus: OrderStatus;
  currency?: string;
  productTotalPrice: number;
  totalDiscount: number;
  totalPrice: number;
  actualTotalPrice: number;
  refundAmount: number;
  customerRemark?: string;
  staffRemark?: string;
  paymentId?: string;
  paidTime?: string;
  completionTime?: string;
  canceledTime?: string;
  cancellationReason?: string;
  reducedInventoryAfterPlacingTime?: string;
  reducedInventoryAfterPaymentTime?: string;
  paymentExpiration?: string;
  orderLines: OrderLineDto[];
  orderExtraFees: OrderExtraFeeDto[];
}

export interface OrderExtraFeeDto {
  name?: string;
  key?: string;
  fee: number;
}

export interface OrderLineDto extends FullAuditedEntityDto<string> {
  productId?: string;
  productSkuId?: string;
  productDetailId?: string;
  productModificationTime?: string;
  productDetailModificationTime?: string;
  productGroupName?: string;
  productGroupDisplayName?: string;
  productUniqueName?: string;
  productDisplayName?: string;
  skuName?: string;
  skuDescription?: string;
  mediaResources?: string;
  currency?: string;
  unitPrice: number;
  totalPrice: number;
  totalDiscount: number;
  actualTotalPrice: number;
  quantity: number;
  refundedQuantity: number;
  refundAmount: number;
  extraProperties: Record<string, object>;
}

export interface UpdateStaffRemarkInput {
  staffRemark?: string;
}
