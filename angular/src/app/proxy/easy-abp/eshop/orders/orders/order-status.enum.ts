import { mapEnumToOptions } from '@abp/ng.core';

export enum OrderStatus {
  Pending = 1,
  Processing = 2,
  Completed = 4,
  Canceled = 8,
}

export const orderStatusOptions = mapEnumToOptions(OrderStatus);
