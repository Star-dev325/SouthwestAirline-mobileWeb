// @flow

import _ from 'lodash';

import type { ChasePrequalResponse } from 'src/shared/flow-typed/shared.types';

export const initIntersectionObserver = () => {
  if (!('IntersectionObserver' in window)) {
    require('intersection-observer');
  }
};

export const toChaseCodes = (response: ChasePrequalResponse) => {
  const acquisitionSourceCodes = _.chain(response)
    .get('offers')
    .map('acquisitionSourceCode')
    .compact()
    .join(',')
    .value();

  const offerIdentifier = _.get(response, 'offerIdentifier', '');
  const highValueIndicator = _.get(response, 'highValueIndicator', '');

  return { acquisitionSourceCodes, highValueIndicator, offerIdentifier };
};
