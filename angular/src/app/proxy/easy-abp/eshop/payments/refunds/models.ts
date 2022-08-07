import type { ExtensibleObject } from '@abp/ng.core';

export interface CreateEShopRefundItemInfoModel extends ExtensibleObject {
  orderId?: string;
  customerRemark?: string;
  staffRemark?: string;
  orderLines: OrderLineRefundInfoModel[];
  orderExtraFees: OrderExtraFeeRefundInfoModel[];
}

export interface OrderExtraFeeRefundInfoModel {
  name?: string;
  key?: string;
  totalAmount: number;
}

export interface OrderLineRefundInfoModel {
  orderLineId?: string;
  quantity: number;
  totalAmount: number;
}

export interface RefundItemOrderExtraFeeEto {
  name?: string;
  key?: string;
  refundAmount: number;
}
