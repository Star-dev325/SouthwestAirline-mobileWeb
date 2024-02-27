// @flow
import React from 'react';
import Button from 'src/shared/components/button';
import CarPickUpInfo from 'src/shared/components/carPickUpInfo';
import DriverInfo from 'src/shared/components/driverInfo';
import ReservationCancelledBanner from 'src/viewReservation/components/reservationCancelledBanner';
import i18n from '@swa-ui/locale';

import type {
  ManageCarReservationDetailsType,
  CarReservationItineraryType
} from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  carReservationItinerary: CarReservationItineraryType,
  manageCarReservationDetails: ManageCarReservationDetailsType,
  openManageOptions: () => void
};

const ManageCarReservation = (props: Props) => {
  const { carReservationItinerary, manageCarReservationDetails, openManageOptions } = props;
  const {
    pickUpTime,
    pickUpAirport: { cityName, cityState },
    vendorImage
  } = carReservationItinerary;
  const { driver, confirmationNumber, isCancelled } = manageCarReservationDetails;

  return (
    <div className="manage-car-reservation mt4 mx4 rd2 overflow-hidden">
      <ReservationCancelledBanner isCancelled={isCancelled} />

      <div className="bgwhite px4 py4">
        <CarPickUpInfo
          className="bdb"
          vendorImage={vendorImage}
          pickUpTime={pickUpTime}
          cityName={cityName}
          cityState={cityState}
        />

        <DriverInfo driver={driver} confirmationNumber={confirmationNumber} />
        {!isCancelled && (
          <div className="mt4" data-qa="car-reservation-manage-button">
            <Button data-qa="manageCarReservationButton" color="grey" size="large" onClick={openManageOptions} fluid>
              {i18n('CAR_BOOKING__CAR_RESERVATION__ADD_OR_CANCEL')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCarReservation;
