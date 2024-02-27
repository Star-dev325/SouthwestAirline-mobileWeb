// @flow
import React from 'react';
import _ from 'lodash';
import i18n from '@swa-ui/locale';
import RecentTripSearchCard from 'src/shared/components/recentTripSearchCard';

import type { PassengerNameRecord } from 'src/shared/flow-typed/shared.types';

type Props = {
  recentTripSearches: Array<PassengerNameRecord>,
  onCardClick: (PassengerNameRecord) => void
};

const RecentTripSearchCardsList = (props: Props) => {
  const { recentTripSearches, onCardClick } = props;

  return (
    <div className="recent-trip-search-cards-list">
      <p className="recent-trip-search-cards-list--title">{i18n('SHARED__RECENT_SEARCHES__TRIP_SEARCH_TITLE')}</p>
      {_.map(recentTripSearches, (card: PassengerNameRecord, index: number) => (
        <RecentTripSearchCard key={index} onClick={onCardClick} {...card} />
      ))}
    </div>
  );
};

export default RecentTripSearchCardsList;
