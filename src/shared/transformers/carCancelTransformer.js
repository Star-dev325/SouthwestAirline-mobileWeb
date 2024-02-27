// @flow
import dayjs from 'dayjs';

import type { CarReservationType } from 'src/viewReservation/flow-typed/viewReservation.types';

export const transformCarReservationToCancelRequest = (carReservation: CarReservationType) => {
  const { carReservationItinerary, manageCarReservationDetails } = carReservation;
  const { firstName, lastName } = manageCarReservationDetails.driver;
  const pickUpDate = dayjs(carReservationItinerary.pickUpTime).format('YYYY-MM-DD');

  return {
    confirmationNumber: manageCarReservationDetails.confirmationNumber,
    firstName,
    lastName,
    pickUpDate
  };
};
