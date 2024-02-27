// @flow

import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import Icon from 'src/shared/components/icon';
import MultiDayIndicator from 'src/shared/components/multiDayIndicator';
import { retrieveHourAndMinutesIgnoreTimezone } from 'src/shared/helpers/dateHelper';

type Props = {
  AIRCRAFT_TYPE_TRIPCARD: boolean,
  aircraftType?: string,
  arrivalAirport: string,
  arrivalTime: string,
  departureAirport: string,
  departureTime: string,
  flightNumber: string,
  isOvernight: boolean,
  originalArrivalTime: string,
  originalDepartureTime: string,
  outdated?: boolean
};

const getFormattedOriginalTimeAndPeriod = (originalTime) => {
  const originalTimeAndPeriod = retrieveHourAndMinutesIgnoreTimezone(originalTime);

  return originalTimeAndPeriod.time + _.lowerCase(originalTimeAndPeriod.period);
};

const FlightSegmentDetails = (props: Props) => {
  const {
    AIRCRAFT_TYPE_TRIPCARD,
    aircraftType,
    arrivalAirport,
    arrivalTime,
    departureAirport,
    departureTime,
    flightNumber,
    isOvernight,
    originalArrivalTime,
    originalDepartureTime,
    outdated
  } = props;
  const formattedDepartureTime = retrieveHourAndMinutesIgnoreTimezone(departureTime);
  const formattedArrivalTime = retrieveHourAndMinutesIgnoreTimezone(arrivalTime);

  return (
    <div className={cx('flight-segment-details', { 'flight-segment-details_outdated': outdated })}>
      <div className="flight-segment-details--time-and-flight">
        <div className="flight-segment-details--time-block">
          <div className="flight-segment-details--time-block-label">
            {i18n('SHARED__FLIGHT_SEGMENT_DETAILS__DEPARTS')}
          </div>
          <div className="flight-segment-details--time-block-time">
            {formattedDepartureTime.time}
            <span className="flight-segment-details--time-block-time-ampm">{formattedDepartureTime.period}</span>
          </div>
          {originalDepartureTime !== departureTime && (
            <div className="flight-segment-details--time-block-time_delayed">
              (was {getFormattedOriginalTimeAndPeriod(originalDepartureTime)})
            </div>
          )}
          <MultiDayIndicator isOvernight={isOvernight} />
        </div>
        <div className="flight-segment-details--flight-number">
          <div>
            {i18n('SHARED__FLIGHT_SEGMENT_DETAILS__FLIGHT')} {flightNumber}
          </div>
          <Icon type="airplane" />
        </div>
        <div className="flight-segment-details--time-block align-right">
          <div className="flight-segment-details--time-block-label">
            {i18n('SHARED__FLIGHT_SEGMENT_DETAILS__ARRIVES')}
          </div>
          <div className="flight-segment-details--time-block-time">
            {formattedArrivalTime.time}
            <span className="flight-segment-details--time-block-time-ampm">{formattedArrivalTime.period}</span>
          </div>
          {originalArrivalTime !== arrivalTime && (
            <div className="flight-segment-details--time-block-time_delayed">
              (was {getFormattedOriginalTimeAndPeriod(originalArrivalTime)})
            </div>
          )}
        </div>
      </div>
      <div className="flight-segment-details--airports">
        <div className="flight-segment-details--airport-info pr3">{departureAirport}</div>
        <div className="flight-segment-details--airport-info pl3 align-right">{arrivalAirport}</div>
      </div>
      {AIRCRAFT_TYPE_TRIPCARD && aircraftType && (
        <div className="flight-segment-details--aircraft-type">
          <div>{aircraftType} (subject to change)*</div>
        </div>
      )}
    </div>
  );
};

export default FlightSegmentDetails;
