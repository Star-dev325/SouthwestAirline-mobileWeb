// @flow

import store2 from 'store2';
import dayjs from 'dayjs';
import _ from 'lodash';

import StorageKeys from 'src/shared/helpers/storageKeys';
import CacheConfig from 'src/shared/cache/cacheConfig';

import type { AirportType, RecentAirportSearchType } from 'src/shared/flow-typed/shared.types';

const { RECENT_AIRPORT_SEARCHES_KEY } = StorageKeys;
const { RECENT_AIRPORT_SEARCH_EXPIRED_MINUTES } = CacheConfig;

const RecentAirportSearchLocalStorageHelper = {
  expirationMin: RECENT_AIRPORT_SEARCH_EXPIRED_MINUTES,

  save(airport: AirportType): Array<RecentAirportSearchType> {
    const { airportGroupSelected = [], airportGroupId }= airport;
    const searches = this.recentAirportSearches;
    const timestamp = this.expirationMin ? dayjs().add(this.expirationMin, 'minutes').unix() : undefined;
    const newRecord = { value: airport, timestamp };
    let targetIndex = _.findIndex(searches, (recentSearch) => recentSearch.value.code === airport.code);

    if (airportGroupSelected.length >= 1) {
      targetIndex = _.findIndex(
        searches,
        (recentSearch) => recentSearch.value.airportGroupId === airportGroupId
      );
    }

    if (targetIndex !== -1) {
      searches[targetIndex] = newRecord;
    } else {
      searches.push(newRecord);
    }
    const sortedCollection: Array<RecentAirportSearchType> = _.chain(searches)
      .sortBy('timestamp')
      .reverse()
      .slice(0, 3)
      .value();

    store2.set(RECENT_AIRPORT_SEARCHES_KEY, sortedCollection);

    return sortedCollection;
  },

  delete(airport: AirportType): Array<RecentAirportSearchType> {
    const updatedSearches: Array<RecentAirportSearchType> = _.reverse(
      _.sortBy(
        this.recentAirportSearches.filter((recentSearch) => recentSearch.value.code !== airport.code),
        'timestamp'
      )
    );

    store2.set(RECENT_AIRPORT_SEARCHES_KEY, updatedSearches);

    return updatedSearches;
  },

  clearRecentSearches() {
    store2.set(RECENT_AIRPORT_SEARCHES_KEY, []);
  },

  refreshRecentAirportSearches(): void {
    const searches = store2.get(RECENT_AIRPORT_SEARCHES_KEY) || [];
    const nonExpiredSearches = searches.filter((recentSearch) => dayjs().unix() < recentSearch.timestamp);

    _.reverse(_.sortBy(nonExpiredSearches, 'timestamp'));
    store2.set(RECENT_AIRPORT_SEARCHES_KEY, nonExpiredSearches);
  },

  get recentAirportSearches(): Array<RecentAirportSearchType> {
    this.refreshRecentAirportSearches();

    return store2.get(RECENT_AIRPORT_SEARCHES_KEY);
  }
};

export default RecentAirportSearchLocalStorageHelper;
