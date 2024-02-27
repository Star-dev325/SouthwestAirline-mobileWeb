// @flow
import React, { Component } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';
import withField from 'src/shared/form/enhancers/withField';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import Calendar from 'src/shared/components/calendar/calendar';
import { tomorrow, daysAfter } from 'src/shared/helpers/dateHelper';
import {
  showFullScreenModal,
  hideFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import { CAR_BOOKING_DATE_FORMAT, CAR_BOOKING_CALENDAR_MODAL_ID } from 'src/carBooking/constants/carBookingConstants';
import { BOTH } from 'src/shared/components/calendar/constants/calendarType';

import type { SelectedDatesType } from 'src/shared/components/calendar/constants/calendarType';

type PickUpAndDropOffDateType = {
  pickUpDate: string,
  dropOffDate: string,
  isDateChanged?: boolean
};

type Props = {
  value: PickUpAndDropOffDateType,
  lastBookableDate: Dayjs,
  onChange: (*) => void,
  isWebView?: boolean
};

export class CarBookingDateSelectorField extends Component<Props, *> {
  _onOpenCalender = () => {
    showFullScreenModal(CAR_BOOKING_CALENDAR_MODAL_ID);
  };

  _formatDate(date: ?Dayjs) {
    return !date ? '' : date.format(CAR_BOOKING_DATE_FORMAT);
  }

  _onSelectDate = (selectedDates: SelectedDatesType) => {
    const departureAndReturnDate = {
      pickUpDate: this._formatDate(selectedDates.newOutboundDate),
      dropOffDate: this._formatDate(selectedDates.newInboundDate),
      isDateChanged: true
    };

    this.props.onChange(departureAndReturnDate);
    hideFullScreenModal(CAR_BOOKING_CALENDAR_MODAL_ID);
  };

  _onCancel = () => {
    hideFullScreenModal(CAR_BOOKING_CALENDAR_MODAL_ID);
  };

  _renderDateDescription = (isDateChanged: boolean, date: Dayjs, message: string) => {
    if (isDateChanged) {
      return (
        <div className="car-booking-date-selector--date-label large gray4 mt3">
          <span>
            <i>{`${date.format('ddd')}, `}</i>
            {date.format('MMM D, YYYY')}
          </span>
        </div>
      );
    }

    return <div className="car-booking-date-selector--date-label large gray4 mt3">{message}</div>;
  };

  _renderDisplayContent = (pickUpDate: Dayjs, dropOffDate: Dayjs, isDateChanged: boolean) => {
    const formattedPickUpDate = dayjs(pickUpDate).format('M/DD');
    const formattedDropOffDate = dayjs(dropOffDate).format('M/DD');

    return (
      <div className="car-booking-search-form--triptych flex flex-main-center flex-cross-center p5 bdgray2">
        <div data-qa="car-booking-pick-up-date" className="car-booking-search-form--triptych-side">
          <div className={cx('xxxlarge', { gray4: !isDateChanged })}>
            <div onClick={this._onOpenCalender} data-qa="pickup-and-return-dates">
              <div className="fluid p1">{formattedPickUpDate}</div>
              {this._renderDateDescription(isDateChanged, pickUpDate, 'Pick-up Date')}
            </div>
          </div>
        </div>

        <div className="car-booking-search-form--triptych-center sltblue xxxlarge">{<Icon type="calender" />}</div>

        <div data-qa="car-booking-drop-off-date" className="car-booking-search-form--triptych-side">
          <div className={cx('xxxlarge', { gray4: !isDateChanged })}>
            <div onClick={this._onOpenCalender} data-qa="pickup-and-return-dates">
              <div className="fluid p1">{formattedDropOffDate}</div>
              {this._renderDateDescription(isDateChanged, dropOffDate, 'Return Date')}
            </div>
          </div>
        </div>
      </div>
    );
  };

  _getDate(date: string, defaultDate: string) {
    return _.isEmpty(date) ? defaultDate : date;
  }

  render() {
    const { value, lastBookableDate, isWebView } = this.props;
    const defaultPickUpDate = tomorrow().format(CAR_BOOKING_DATE_FORMAT);
    const defaultDropOffDate = daysAfter(3, tomorrow()).format(CAR_BOOKING_DATE_FORMAT);
    const pickUpDate = dayjs(this._getDate(_.get(value, 'pickUpDate'), defaultPickUpDate), CAR_BOOKING_DATE_FORMAT);
    const dropOffDate = dayjs(this._getDate(_.get(value, 'dropOffDate'), defaultDropOffDate), CAR_BOOKING_DATE_FORMAT);
    const isDateChanged = _.get(value, 'isDateChanged', false);

    return (
      <div className="center">
        {this._renderDisplayContent(pickUpDate, dropOffDate, isDateChanged)}

        <FullScreenModal id={CAR_BOOKING_CALENDAR_MODAL_ID} ref="calendar">
          <Calendar
            type={BOTH}
            isCarBooking
            initDepartureDate={pickUpDate}
            initReturningDate={dropOffDate}
            maxReservationDate={lastBookableDate}
            minReservationDate={dayjs()}
            onSelectionComplete={this._onSelectDate}
            onCancel={this._onCancel}
            isWebView={isWebView}
          />
        </FullScreenModal>
      </div>
    );
  }
}

export default withField()(CarBookingDateSelectorField);
