// @flow
import React from 'react';
import dayjs from 'dayjs';

type Props = {
  origin: ?string,
  destination: ?string,
  header: string,
  selectionDate?: string,
  selectionClass?: string
};

const LowFareSelection = (props: Props) => {
  const { selectionDate, header, origin, destination, selectionClass } = props;

  return (
    <div className={`low-fare-calendar-page--selection ${selectionClass || ''}`}>
      <div className="header">{header}</div>
      <div className="value">
        {selectionDate && origin && destination
          ? `${dayjs(selectionDate).format('ddd, MMM D, YYYY')} (${origin} - ${destination})`
          : '- -'}
      </div>
    </div>
  );
};

export default LowFareSelection;
