import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import * as VehicleTypesHelper from 'src/carBooking/helpers/vehicleTypesHelper';

const getCarType = (state) => _.get(state, 'app.carBooking.carShoppingResultsPage.searchRequest.vehicleType');
const getCarResults = (state) => _.get(state, 'app.carBooking.carShoppingResultsPage.carResults');

const VEHICLE_KEYS_TO_KEEP = [
  'appliedDiscount',
  'incentiveText',
  'isRapidRewardsPartner',
  'isUnavailable',
  'pricePerDayCents',
  'promoCodeApplied',
  'totalCentsWithTaxes',
  'vendorName'
];

export const getCarResult = createSelector([getCarType, getCarResults], (carType, carResults) => {
  const typeKey = VehicleTypesHelper.labelToType(carType);
  const carResult = _.get(carResults, `${typeKey}`);
  const vehicleArray = _.get(carResult, 'allVehicles', []);

  const vehicles = vehicleArray.map((value) => _.pick(value, VEHICLE_KEYS_TO_KEEP));

  return {
    vehicleType: carType,
    vehicles
  };
});
