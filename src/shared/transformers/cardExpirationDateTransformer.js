// @flow

import _ from 'lodash';
import dayjs from 'dayjs';
import type { PaymentInfo } from 'src/shared/flow-typed/shared.types';

type ExpirationDateFormat = 'MM/YYYY' | 'YYYY-MM';

export const transformExpirationPaymentInfo = (paymentInfo: PaymentInfo, format: ExpirationDateFormat) => {
  const paymentExpiration = paymentInfo.expiration;
  const transformedExpiration = dayjs(paymentExpiration, ['MM/YYYY', 'YYYY-MM']).format(format);

  return _.merge({}, paymentInfo, { expiration: transformedExpiration });
};
