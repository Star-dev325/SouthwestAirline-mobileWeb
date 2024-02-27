// @flow
import dayjs from 'dayjs';
import React from 'react';
import FlightTime from 'src/shared/components/flightTime';
import Icon from 'src/shared/components/icon';
import MultiDayIndicator from 'src/shared/components/multiDayIndicator';

import type { BriefBoundType } from 'src/shared/flow-typed/shared.types';

const BriefBound = (props: BriefBoundType) => {
  const {
    arrivalAirportCode,
    arrivalTime,
    departureAirportCode,
    departureDate,
    departureDayOfWeek,
    departureTime,
    isNextDayArrival,
    isOvernight,
    isOvernightUnderDeparture,
    stops = []
  } = props;

  const isOvernightFlag = isOvernight || !!(stops && stops.some((stop) => stop.isOvernight));

  return (
    <div className="flight-brief-summary bgwhite bdb p5">
      <div className="flex xlarge pdkblue bold">
        <div className="flex4">{dayjs(departureDate).format('MMM D')}</div>
        <div className="flex2">{departureAirportCode}</div>
        <div className="flex2 flight-brief-summary--airplane center">
          <Icon type="airplane" className="mt3" />
        </div>
        <div className="flex2">{arrivalAirportCode}</div>
      </div>
      <div className="flex large gray4">
        <div className="flex4">{departureDayOfWeek}</div>
        {isOvernightUnderDeparture ? <div className="flex2">
          <FlightTime className="flex2" timeString={departureTime} />
          <MultiDayIndicator isNextDay={isNextDayArrival} isOvernight={isOvernightFlag} />
        </div> : <FlightTime className="flex2" timeString={departureTime} />}
        <div className="flex2" />
        <div className="flight-brief-summary--summary-group">
          <FlightTime className="flex2" timeString={arrivalTime} />
          <MultiDayIndicator isNextDay={!isOvernightUnderDeparture && isNextDayArrival} isOvernight={!isOvernightUnderDeparture && isOvernightFlag} />
        </div>
      </div>
    </div>
  );
};

export default BriefBound;
