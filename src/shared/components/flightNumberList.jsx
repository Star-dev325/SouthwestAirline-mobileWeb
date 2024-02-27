// @flow

import _ from 'lodash';
import cx from 'classnames';
import FlightNumber from 'src/shared/components/flightNumber';
import React from 'react';

import type { FlightInfoType } from 'src/checkIn/flow-typed/checkIn.types';

type Props = {
  AIRCRAFT_TYPE_VIEWRES?: boolean,
  flights: Array<FlightInfoType>
};

const FlightNumberList = (props: Props) => {
  const { AIRCRAFT_TYPE_VIEWRES, flights } = props;

  return (
    <div
      className={cx('flight-number-list', {
        'flex-row': !AIRCRAFT_TYPE_VIEWRES,
        'flex-column': AIRCRAFT_TYPE_VIEWRES
      })}
    >
      {_.map(flights, (flight, index: number) => {
        const { aircraftInfo, flightNumber } = flight;
        const aircraftType = aircraftInfo ? aircraftInfo.aircraftType : '';

        return (
          <FlightNumber
            AIRCRAFT_TYPE_VIEWRES={AIRCRAFT_TYPE_VIEWRES}
            aircraftType={aircraftType}
            flightNumber={flightNumber}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default FlightNumberList;
