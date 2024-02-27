// @flow

import React from 'react';
import Icon from 'src/shared/components/icon';
import { flightStatusCssClassMapping } from 'src/flightStatus/constants/flightStatusCssClassMapping';
import { retrieveHourAndMinutesIgnoreTimezone } from 'src/shared/helpers/dateHelper';

type Props = {
  status?: string,
  statusType?: string,
  originalTime?: string
};

const FlightStatusIcon = (props: Props) => {
  const { status, statusType, originalTime } = props;
  const statusClass = flightStatusCssClassMapping[statusType];
  const formattedTime = retrieveHourAndMinutesIgnoreTimezone(originalTime);

  return (
    <span className={`segment-status-col flight-status ${statusClass}`}>
      <Icon type={status === 'CANCELLED' ? 'remove' : 'home-flight-status'} />
      <span className="flight-status--text">{status}</span>
      {status === 'DELAYED' && originalTime && (
        <p className="flight-status--sub-text">
          {' '}
          (was {formattedTime.time}
          <span className="time-period--subtext">{formattedTime.period}</span>)
        </p>
      )}
    </span>
  );
};

export default FlightStatusIcon;
