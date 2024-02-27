// @flow
import _ from 'lodash';
import numeral from 'numeral';

import type { EarlyBirdPriceSubTotalType, EarlyBirdBoundType } from 'src/earlyBird/flow-typed/earlyBird.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

const getPaxCountByBound = (formData, boundIndex) =>
  _.chain(formData)
    .filter((val, key) => _.startsWith(key, `bound_${boundIndex}`))
    .compact()
    .size()
    .value();

export const transformToEarlyBirdPriceSubTotal = (
  bounds: Array<EarlyBirdBoundType>,
  formData: FormData
): Array<EarlyBirdPriceSubTotalType> =>
  bounds &&
  bounds.map((bound: EarlyBirdBoundType, boundIndex: number) => {
    const { departureAirportCode, arrivalAirportCode, earlyBirdBoundPrice, flight } = bound;
    const selectedPaxCount = getPaxCountByBound(formData, boundIndex);
    const totalBoundPrice = _.merge({}, earlyBirdBoundPrice, {
      amount: numeral(earlyBirdBoundPrice.amount).multiply(selectedPaxCount).format('0,0.00')
    });

    return {
      departureAirportCode,
      arrivalAirportCode,
      earlyBirdBoundPrice,
      flight,
      selectedPaxCount,
      totalBoundPrice
    };
  });
