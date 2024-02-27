// @flow
import _ from 'lodash';
import React from 'react';

import ManageCarReservation from 'src/shared/components/manageCarReservation';
import CarReservation from 'src/shared/components/carReservation';
import BottomLinksPopup from 'src/shared/components/popups/bottomLinksPopup';
import { tomorrow, isDateTimeInTheFuture, daysAfter } from 'src/shared/helpers/dateHelper';
import {
  CAR_BOOKING_DATE_FORMAT,
  CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT
} from 'src/carBooking/constants/carBookingConstants';
import i18n from '@swa-ui/locale';

import type { CarReservationType } from 'src/viewReservation/flow-typed/viewReservation.types';
import type { SearchRequestType } from 'src/carBooking/flow-typed/carBooking.types';
import type { DialogOptionsType } from 'src/shared/flow-typed/dialog.types';

type Props = {
  carReservation: CarReservationType,
  onAddOtherCarClick: (SearchRequestType) => void,
  onCancelCarReservationClick: (*) => void,
  showDialogFn: (DialogOptionsType) => void,
  hideDialogFn: () => void
};

type State = {
  showManageOptions: boolean
};

class ManageCarReservationWithDetails extends React.Component<Props, State> {
  static defaultProps = {
    onAddOtherCarClick: _.noop,
    onCancelCarReservationClick: _.noop
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      showManageOptions: false
    };
  }

  _openManageOptions = () => {
    this.setState({ showManageOptions: true });
  };

  _closeManageOptions = () => {
    this.setState({ showManageOptions: false });
  };

  _addAnotherCar = () => {
    const {
      carReservationItinerary: { dropOffAirport, pickUpAirport, pickUpTime, dropOffTime }
    } = this.props.carReservation;
    const { onAddOtherCarClick } = this.props;
    const request = {
      pickUp: pickUpAirport.airportCode,
      pickUpDate: isDateTimeInTheFuture(pickUpTime) ? pickUpTime : tomorrow().format(CAR_BOOKING_DATE_FORMAT),
      pickUpTime: isDateTimeInTheFuture(pickUpTime) ? pickUpTime : CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
      dropOff: dropOffAirport.airportCode,
      dropOffDate: isDateTimeInTheFuture(pickUpTime)
        ? dropOffTime
        : daysAfter(3, tomorrow()).format(CAR_BOOKING_DATE_FORMAT),
      dropOffTime: isDateTimeInTheFuture(pickUpTime) ? dropOffTime : CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
      isRoundTrip: true
    };

    onAddOtherCarClick(request);
  };

  _openCancelCarConfirm = () => {
    const { hideDialogFn, showDialogFn } = this.props;

    this._closeManageOptions();
    const dialogButtons = [
      {
        label: i18n('SHARED__VIEW_RESERVATION__CANCELLATION_BUTTONS_DO_NOT_CANCEL'),
        onClick: hideDialogFn,
        dataQa: 'do-not-cancel-button'
      },
      {
        label: i18n('SHARED__VIEW_RESERVATION__CANCELLATION_BUTTONS_CANCEL_RESERVATION'),
        onClick: this._cancelCarReservation,
        dataQa: 'confirm-cancel-button'
      }
    ];

    showDialogFn({
      name: 'car-cancel-confirmation',
      title: i18n('SHARED__VIEW_RESERVATION__CANCELLATION_CONFIRMATION_TITLE'),
      verticalLinks: {
        links: dialogButtons,
        hideCloseButton: true
      },
      message: i18n('SHARED__VIEW_RESERVATION__CANCELLATION_CONFIRMATION_MESSAGE')
    });
  };

  _cancelCarReservation = () => {
    const { hideDialogFn, onCancelCarReservationClick, carReservation } = this.props;

    hideDialogFn();
    onCancelCarReservationClick(carReservation);
  };

  _getBottomLinks = () => [
    {
      handler: this._addAnotherCar,
      dataQa: 'add-another-car',
      label: i18n('SHARED__VIEW_RESERVATION__BOTTOM_LINKS_POPUP_ADD_ANOTHER_CAR')
    },
    {
      handler: this._openCancelCarConfirm,
      dataQa: 'cancel-car-reservation',
      label: i18n('SHARED__VIEW_RESERVATION__BOTTOM_LINKS_POPUP_CANCEL_CAR_RESERVATION')
    }
  ];

  render() {
    const { carReservationItinerary, carReservationDetail, manageCarReservationDetails } = this.props.carReservation;
    const manageCarReservationProps = { carReservationItinerary, manageCarReservationDetails };
    const carReservationProps = { carReservationItinerary, carReservationDetail };

    return (
      <div className="manage-car-reservation-with-details">
        <ManageCarReservation {...manageCarReservationProps} openManageOptions={this._openManageOptions} />
        <CarReservation {...carReservationProps} />

        <BottomLinksPopup
          links={this._getBottomLinks()}
          active={this.state.showManageOptions}
          name="manage-reservation-options"
          closeLabel={i18n('SHARED__BUTTON_TEXT__CANCEL')}
          onClose={this._closeManageOptions}
          bottom
        />
      </div>
    );
  }
}

export default ManageCarReservationWithDetails;
