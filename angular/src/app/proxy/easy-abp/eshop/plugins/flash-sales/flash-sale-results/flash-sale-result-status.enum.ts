import { mapEnumToOptions } from '@abp/ng.core';

export enum FlashSaleResultStatus {
  Pending = 0,
  Successful = 1,
  Failed = 2,
}

export const flashSaleResultStatusOptions = mapEnumToOptions(FlashSaleResultStatus);
