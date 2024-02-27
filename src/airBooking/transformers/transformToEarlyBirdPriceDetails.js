// @flow
import _ from 'lodash';
import numeral from 'numeral';
import type { EarlyBirdEligibility, EarlyBirdInPathBound } from 'src/airBooking/flow-typed/airBooking.types';
import type { EarlyBirdPriceDetailType, CurrencyType } from 'src/shared/flow-typed/shared.types';

export const transformToUnitPrice = (bound: EarlyBirdInPathBound): CurrencyType =>
  _.get(bound, '_meta.products.adult.fare.totalFare');

export const transformToEarlyBirdPriceDetails = (
  earlyBirdEligibility?: ?EarlyBirdEligibility
): Array<EarlyBirdPriceDetailType> => {
  const bounds = _.get(earlyBirdEligibility, 'bounds');

  return _.map(bounds, (bound: EarlyBirdInPathBound) => {
    const { originDestinationAirports, _meta, isEligible } = bound;

    const adultPaxRefs = _.get(_meta, 'products.adult.passengerReference');
    const purchasedCount = isEligible && adultPaxRefs ? adultPaxRefs.length : 0;
    const unitPrice = transformToUnitPrice(bound);
    const amount = numeral(_.get(unitPrice, 'amount')).multiply(purchasedCount).format('0,000.00');
    const total = _.merge({}, _.pick(unitPrice, ['currencyCode', 'currencySymbol']), { amount });

    return {
      description: `EarlyBird Check-in® (${originDestinationAirports})`,
      purchasedCount,
      total,
      unitPrice
    };
  });
};
