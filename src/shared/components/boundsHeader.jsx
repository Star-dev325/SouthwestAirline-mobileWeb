// @flow
import React from 'react';

import TripDateAndDestCity from 'src/shared/components/tripDateAndDestCity';
import ConfirmationNumber from 'src/shared/components/confirmationNumber';
import formatDateRange from 'src/shared/helpers/formatDateRange';

import type { ConfirmationDates } from 'src/shared/flow-typed/shared.types';

type Props = {
  dates: ?ConfirmationDates,
  originationDestinationDescription: string,
  destinationDescription: string,
  recordLocator: string
};

const BoundsHeader = ({ dates, originationDestinationDescription, destinationDescription, recordLocator }: Props) => (
  <div className="bounds-header">
    <div className="bounds-header--destination">
      <TripDateAndDestCity
        date={dates && dates.first ? formatDateRange(dates.first, dates.second) : ''}
        cityName={destinationDescription}
        className="pblue"
      />
      <ConfirmationNumber confirmationNumber={recordLocator} />
    </div>
    <div className="bounds-header--airports">{originationDestinationDescription}</div>
  </div>
);

export default BoundsHeader;
