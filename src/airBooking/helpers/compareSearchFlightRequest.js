import _ from 'lodash';
import { transformToAPIRequest } from 'src/shared/transformers/flightProductSearchRequestTransformer';

export const compareSearchFlightRequest = (requestOne, requestTwo) => {
  const transformedRequestOneQuery = _.get(transformToAPIRequest(requestOne), 'query');
  const transformedRequestTwoQuery = _.get(transformToAPIRequest(requestTwo), 'query');
  const requestOneWithoutPromoCode = _.omit(transformedRequestOneQuery, 'promo-code');
  const requestTwoWithoutPromoCode = _.omit(transformedRequestTwoQuery, 'promo-code');

  return _.isEqual(requestOneWithoutPromoCode, requestTwoWithoutPromoCode);
};
