// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';

import type { FlightBoundCard } from 'src/shared/flow-typed/shared.types';
import i18n from '@swa-ui/locale';

type Props = {
  bound: FlightBoundCard,
  searchFlightsFromBound: (origin: string, destination: string, isBoundDrawerOpen: boolean) => void,
  isBoundDrawerOpen: boolean,
  isBoundUnavailable: boolean
};

const FlightBoundDrawer = ({ bound, searchFlightsFromBound, isBoundDrawerOpen, isBoundUnavailable }: Props) => {
  const { originAirport, destinationAirport } = bound;

  const onBoundClick = (origin: string, destination: string) =>
    searchFlightsFromBound && searchFlightsFromBound(origin, destination, isBoundDrawerOpen);

  return (
    <div className="flight-bound--container" onClick={() => !isBoundUnavailable && onBoundClick(originAirport, destinationAirport)}>
      <span>
        {originAirport}
        <Icon type="airplane" className="flight-bound--icon" />
        {destinationAirport}
      </span>
      <span className={`${isBoundUnavailable ? 'flight-bound--unavailable' : ''}`}>
        {isBoundUnavailable ? (
          i18n('AIR_BOOKING_MULTI_SELECT_GROUP_UNAVAILABLE')
        ) : (
          <Icon className="collapse-bound--icon" type={isBoundDrawerOpen ? 'openeddrawer' : 'closeddrawer'} />
        )}
      </span>
    </div>
  );
};

export default FlightBoundDrawer;
