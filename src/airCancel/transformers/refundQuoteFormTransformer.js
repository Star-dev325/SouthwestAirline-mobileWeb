// @flow
import { REFUND_METHOD } from 'src/shared/constants/refundMethods';
import RefundTypes from 'src/shared/constants/refundTypes';

const { BACK_TO_ORIGINAL_PAYMENT } = RefundTypes;

export const transformToRefundQuoteFormData = (refundRequested?: ?boolean) => {
  let refundMethod;

  if (refundRequested === false) {
    refundMethod = REFUND_METHOD.HOLD_FUTURE_USE;
  } else if (refundRequested === true) {
    refundMethod = BACK_TO_ORIGINAL_PAYMENT;
  }

  return { refundMethod };
};
