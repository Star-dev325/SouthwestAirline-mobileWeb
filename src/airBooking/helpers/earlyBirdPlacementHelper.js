// @flow

import _ from 'lodash';
import numeral from 'numeral';
import i18n from '@swa-ui/locale';
import type { EarlyBirdEligibility } from 'src/airBooking/flow-typed/airBooking.types';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

const getEarlyBirdPrefixText = (unitPriceInBound: CurrencyType, unitPriceOutBound: CurrencyType) => {
  const showStartingFromMessage =
    !!unitPriceOutBound &&
    !!unitPriceInBound &&
    _.get(unitPriceOutBound, 'amount') !== _.get(unitPriceInBound, 'amount');

  return showStartingFromMessage ? i18n('SHARED__EARLY_BIRD__PER_PASSENGER_PRICE_MESSAGE_PREFIX') : '(';
};

const getEarlyBirdUnitAmount = (unitPriceInBound: CurrencyType, unitPriceOutBound: CurrencyType) => {
  const earlyBirdUnitPrice = _.chain([unitPriceOutBound, unitPriceInBound])
    .compact()
    .minBy((item) => numeral(item.amount).value())
    .value();

  return _.get(earlyBirdUnitPrice, 'amount');
};

export const getEarlyBirdAdditionalTemplateData = (
  unitPriceInBound: CurrencyType,
  unitPriceOutBound: CurrencyType,
  earlyBirdEligibility: ?EarlyBirdEligibility
) => ({
  earlyBirdTotalPrice: _.get(earlyBirdEligibility, 'totalPrice.amount'),
  earlyBirdUnitPrice: getEarlyBirdUnitAmount(unitPriceInBound, unitPriceOutBound),
  earlyBirdPrefixText: getEarlyBirdPrefixText(unitPriceInBound, unitPriceOutBound)
});
