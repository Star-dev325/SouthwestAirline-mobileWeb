import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getCarReservation = (state) => _.get(state, 'app.carBooking.carPricingPage.carReservation.carReservationDetail');
const getSelectedCar = (state) => _.get(state, 'app.carBooking.carPricingPage.selectedCar');
const getSelectedExtras = (state) => _.get(state, 'app.carBooking.carPricingPage.selectedExtras', []);

const CAR_RESERVATION_KEYS_TO_KEEP = [
  'baseRate',
  'carType',
  'isRapidRewardsPartner',
  'mileage',
  'pricePerDayCents',
  'promoCodeApplied',
  'rrIncentiveText',
  'taxes',
  'totalCentsWithTaxes',
  'vendorName'
];

const SELECTED_CAR_KEYS_TO_KEEP = [
  'isRapidRewardsPartner',
  'pricePerDayCents',
  'pricePerDayCents',
  'totalCentsWithTaxes',
  'isUnavailable',
  'vendorName'
];

export const getCarSelection = createSelector(
  [getCarReservation, getSelectedCar, getSelectedExtras],
  (carReservation, selectedCar, selectedExtras) => {
    const carPromo = _.get(selectedCar, 'appliedDiscount.code');

    return {
      selectedCarProduct: {
        ..._.pick(carReservation, CAR_RESERVATION_KEYS_TO_KEEP),
        ..._.pick(selectedCar, SELECTED_CAR_KEYS_TO_KEEP),
        ...(carPromo && { carPromo })
      },
      selectedExtras
    };
  }
);
