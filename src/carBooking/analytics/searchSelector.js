import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const emptyDiscount = { vendor: '', type: '', code: '', isValid: null };
const promoCode1 = (state) =>
  _.get(state, 'app.carBooking.carShoppingResultsPage.response.promoCodes.0', emptyDiscount);
const promoCode2 = (state) =>
  _.get(state, 'app.carBooking.carShoppingResultsPage.response.promoCodes.1', emptyDiscount);
const getSearchRequest = (state) => _.get(state, 'app.carBooking.carShoppingResultsPage.searchRequest');

const convertPromoCodeToDiscount = (promoCode) => ({
  ..._.omit(promoCode, 'promoCodeApplied'),
  isValid: promoCode.isValid === null ? promoCode.isValid : _.get(promoCode, 'promoCodeApplied')
});

const initialStateSearchRequest = {
  carCompany: undefined,
  dropoffDate: undefined,
  dropoffLocation: undefined,
  dropoffTime: undefined,
  pickupDate: undefined,
  pickupLocation: undefined,
  pickupTime: undefined,
  vehicleType: undefined
};

export const getSearch = createSelector([getSearchRequest, promoCode1, promoCode2], (searchRequest, promo1, promo2) => {
  if (_.isEmpty(searchRequest)) {
    return initialStateSearchRequest;
  }

  return {
    discount1: convertPromoCodeToDiscount(promo1),
    discount2: convertPromoCodeToDiscount(promo2),
    carCompany: searchRequest.carCompany,
    vehicleType: searchRequest.vehicleType,
    dropoffLocation: searchRequest.dropOff,
    dropoffDate: searchRequest.dropOffDate,
    dropoffTime: searchRequest.dropOffTime,
    pickupLocation: searchRequest.pickUp,
    pickupDate: searchRequest.pickUpDate,
    pickupTime: searchRequest.pickUpTime
  };
});
