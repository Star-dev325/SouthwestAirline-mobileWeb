// @flow
import _ from 'lodash';
import { POINTS } from 'src/shared/constants/currencyTypes';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import type { RetrievedFundType } from 'src/travelFunds/flow-typed/travelFunds.types';

const { SPLIT_PAYMENT } = TravelFundsConstants;

export const isSplitPaymentFund = (funds: Array<RetrievedFundType>) =>
  funds && funds.some((fund) => fund.travelFundType === SPLIT_PAYMENT);

export const isCurrencyAmountZero = (currency: ?CurrencyType) =>
  (currency ? _.get(currency, 'amount', '') === '0.00' : false);

export const getZeroValueByCurrencyCode = (currency: ?CurrencyType) =>
  (currency && currency.currencyCode === POINTS && '0') || '0.00';
