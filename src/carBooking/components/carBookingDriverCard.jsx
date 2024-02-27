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
  carReservation: {
    carReservationItinerary: CarReservationItineraryType,
    carReservationDetail: CarReservationDetailType
  },
  confirmationNumber: string,
  driver: {
    firstName: string,
    lastName: string
  }
};

const CarBookingDriverCard = (props: Props) => {
  const {
    confirmationNumber,
    driver: { firstName, lastName },
    carReservation: { carReservationItinerary, carReservationDetail }
  } = props;

  return (
    <div className="mx4 car-booking-driver-card">
      <div className="bgpdkblue white px5 py3 xlarge bold mt4">
        {i18n('CAR_BOOKING__PURCHASE_CONFIRMATION__DRIVER')}
      </div>
      <div className="bgwhite pdkblue px5 py2">
        <div className="xxlarge py2 bold ellipsis overflow-hidden">{`${firstName} ${lastName}`}</div>
        <div className="large gray5">
          {i18n('CAR_BOOKING__PURCHASE_CONFIRMATION__CONFIRMATION_NUMBER')}
          <span className="bold pdkblue">{confirmationNumber}</span>
        </div>
      </div>
      <div className="bgwhite mb4 px4 py4">
        <CarReservationItinerary {...carReservationItinerary} />
        <CarReservationDetail {...carReservationDetail} />
      </div>
    </div>
  );
};

export default CarBookingDriverCard;
