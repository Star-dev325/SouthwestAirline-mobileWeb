// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';
import { apiFlightStatusToCssClassMapping } from 'src/flightStatus/constants/apiFlightStatusToCssClassMapping';

type Props = {
  status: string
};

const FlightStatusIcon = (props: Props) => {
  const { status } = props;
  const statusClass = status ? apiFlightStatusToCssClassMapping[status] : '';

  return (
    <span className={`segment-status-col flight-status ${statusClass}`}>
      <Icon type={status === 'Cancelled' ? 'remove' : 'home-flight-status'} />
      <span className="flight-status--text">{status}</span>
    </span>
  );
};

export default FlightStatusIcon;
