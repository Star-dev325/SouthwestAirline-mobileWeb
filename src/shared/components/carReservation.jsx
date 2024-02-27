// @flow
import React from 'react';
import CarReservationDetail from 'src/carBooking/components/carReservationDetail';
import CarReservationItinerary from 'src/carBooking/components/carReservationItinerary';
import i18n from '@swa-ui/locale';

import type {
  CarReservationItineraryType,
  CarReservationDetailType
} from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  carReservationItinerary: CarReservationItineraryType,
  carReservationDetail: CarReservationDetailType
};

const CarReservation = ({ carReservationItinerary, carReservationDetail }: Props) => (
  <div className="car-reservation-card-container">
    <div className="car-reservation-card--title bgpdkblue white px5 py3 xxlarge mx4 mt4">
      {i18n('CAR_BOOKING__CAR_RESERVATION__TITLE')}
    </div>
    <div className="car-reservation-card--body bgwhite mx4 px4 py6">
      <CarReservationItinerary {...carReservationItinerary} />
      <CarReservationDetail {...carReservationDetail} />
    </div>
  </div>
);

export default CarReservation;
