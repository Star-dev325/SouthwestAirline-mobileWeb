// @flow

import cx from 'classnames';
import React from 'react';

type Props = {
  AIRCRAFT_TYPE_VIEWRES?: boolean,
  aircraftType?: string,
  className?: string,
  flightNumber: string,
  showDivider?: boolean
};

const FlightNumber = (props: Props) => {
  const { AIRCRAFT_TYPE_VIEWRES, aircraftType, flightNumber, className } = props;
  const hasAircraftType = AIRCRAFT_TYPE_VIEWRES && aircraftType;

  return (
    <span
      className={cx(className, 'flight-number', {
        'flight-number--block': hasAircraftType
      })}
    >
      <span>{flightNumber}</span>
      {hasAircraftType && <span className="aircraft-type"> {aircraftType} (subject to change)*</span>}
    </span>
  );
};

export default FlightNumber;
