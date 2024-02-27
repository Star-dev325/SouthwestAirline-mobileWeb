// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  isReturning: boolean,
  departureDate: string
};

const FlightSummaryCardHeader = (props: Props) => {
  const { isReturning, departureDate } = props;

  return (
    <div
      className={cx('flight-summary-header', {
        'flight-summary-departing': !isReturning,
        'flight-summary-returning': isReturning
      })}
    >
      <span className="flight-summary-title">{isReturning ? 'Returning' : 'Departing'}</span>

      <span className="flight-day">{departureDate}</span>
    </div>
  );
};

export default FlightSummaryCardHeader;
