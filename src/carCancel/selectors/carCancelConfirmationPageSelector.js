// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { get, isEmpty } from 'src/shared/helpers/jsUtils';

const getCarReservation = (state) => get(state, 'app.viewReservation.carReservation');

export const getCarCancelInfo = createSelector([getCarReservation], (carReservation) => {
  if (isEmpty(carReservation)) {
    return {};
  }

  const {
    carReservationItinerary: { pickUpAirport, pickUpTime },
    manageCarReservationDetails: { driver, confirmationNumber },
    carReservationDetail: { vendorImage }
  } = carReservation;

  return {
    driver,
    confirmationNumber,
    vendorImage,
    pickUpTime,
    cityName: pickUpAirport.cityName,
    cityState: pickUpAirport.cityState
  };
});
