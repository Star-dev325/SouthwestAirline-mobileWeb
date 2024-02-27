// @flow
import dayjs from 'dayjs';
import { formatDate } from 'src/shared/helpers/dateHelper';

import type { CarSearchRequestType } from 'src/viewReservation/flow-typed/viewReservation.types';
import type { SearchRequestType, GetCarBookingLinkQueryType } from 'src/carBooking/flow-typed/carBooking.types';

export const transformToSearchRequest = (flightInfo: CarSearchRequestType): SearchRequestType => {
  const { pickUp, pickUpDateTime, dropOff, dropOffDateTime, isRoundTrip } = flightInfo;

  return {
    pickUp,
    pickUpDate: _roundDate(pickUpDateTime, true),
    pickUpTime: _roundMinutes(pickUpDateTime, true),
    dropOff,
    dropOffDate: _roundDate(dropOffDateTime, !isRoundTrip),
    dropOffTime: _roundMinutes(dropOffDateTime, !isRoundTrip)
  };
};

export const transformFromQueryToSearchRequest = (
  carBookingLinkQuery: GetCarBookingLinkQueryType
): SearchRequestType => {
  const carSearchForm = {
    pickUp: carBookingLinkQuery['pickup-location'],
    pickUpDateTime: carBookingLinkQuery['pickup-datetime'],
    dropOff: carBookingLinkQuery['return-location'],
    dropOffDateTime: carBookingLinkQuery['return-datetime'],
    isRoundTrip: true
  };

  return transformToSearchRequest(carSearchForm);
};

const _roundMinutes = (dateTime: string, isDown: boolean) => {
  const start = dayjs(dateTime);
  const minuteReminder = start.minute() % 30;

  if (isDown && minuteReminder !== 0) {
    start.add(30, 'minutes');
  }
  start.subtract(minuteReminder, 'minutes');

  return start.format('h:mmA');
};

const _roundDate = (dateTime: string, isDown: boolean) => {
  const start = dayjs(dateTime);
  const minuteReminder = start.minute() % 30;

  if (isDown && minuteReminder !== 0) {
    start.add(30, 'minutes');
  }
  start.subtract(minuteReminder, 'minutes');

  return formatDate(start);
};
