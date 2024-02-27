// @flow
import React from 'react';
import i18n from '@swa-ui/locale';

import type { PassengerNameRecord } from 'src/shared/flow-typed/shared.types';

type Props = PassengerNameRecord & { onClick: (PassengerNameRecord) => void };

const RecentTripSearchCard = (props: Props) => {
  const { firstName, lastName, recordLocator, onClick } = props;

  return (
    <div className="recent-trip-search-card" onClick={onClick.bind(null, { firstName, lastName, recordLocator })}>
      <div className="recent-trip-search-card--title">
        <span className="recent-trip-search-card--title-passenger">
          {i18n('SHARED__PASSENGER_RESERVATION_TITLE__PASSENGER')}
        </span>
        <span className="recent-trip-search-card--title-confirmation">
          {i18n('SHARED__PASSENGER_RESERVATION_TITLE__CONFIRMATION')}
        </span>
      </div>
      <div className="recent-trip-search-card--content">
        <span className="recent-trip-search-card--content-passenger-name">{`${firstName} ${lastName}`}</span>
        <span className="recent-trip-search-card--content-confirmation">{recordLocator}</span>
      </div>
    </div>
  );
};

export default RecentTripSearchCard;
