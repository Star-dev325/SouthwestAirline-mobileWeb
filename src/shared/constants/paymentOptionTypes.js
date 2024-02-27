import { fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';

export const PAYMENT_OPTION_TYPES = {
  UPLIFT: 'UPLIFT',
  PAYPAL: 'PAYPAL',
  APPLE_PAY: 'APPLE_PAY',
  SAVED_CREDIT_CARD: 'SAVED_CREDIT_CARD',
  CHASE_INSTANT_RR_VISA: 'CHASE_INSTANT_RR_VISA'
};

export const DEFAULT_PAYMENT_OPTION_ORDER = [
  'UPLIFT',
  'PAYPAL',
  'APPLE_PAY',
  'SAVED_CREDIT_CARD',
  'CHASE_INSTANT_RR_VISA'
];
export const PAYMENT_OPTION_ORDER = fetchBootstrapData(
  BootstrapConstants.PAYMENT_OPTION_ORDER_PATH,
  DEFAULT_PAYMENT_OPTION_ORDER
);
