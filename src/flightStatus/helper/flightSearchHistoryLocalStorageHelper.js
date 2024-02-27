// @flow

import store from 'store2';
import _ from 'lodash';
import dayjs from 'dayjs';
import { transformToFlightSearchRequest } from 'src/flightStatus/transformers/flightStatusTransformer';
import StorageKeys from 'src/shared/helpers/storageKeys';
import type { RecentSearchRequestType } from 'src/flightStatus/flow-typed/flightStatus.types';

const { FLIGHT_STATUS_CACHE_KEY } = StorageKeys;

class FlightSearchHistoryLocalStorageHelper {
  static MAX_SIZE = 20;

  static get() {
    let searchRequests: Array<RecentSearchRequestType> = [];
    const savedFlightStatusRecentRequests = store.get(FLIGHT_STATUS_CACHE_KEY);

    if (savedFlightStatusRecentRequests && savedFlightStatusRecentRequests !== 'undefined') {
      searchRequests = JSON.parse(savedFlightStatusRecentRequests).map((savedRequest) =>
        transformToFlightSearchRequest(savedRequest.from, savedRequest.to, savedRequest.date, savedRequest.flightNumber)
      );

      const dayBeforeYesterday = dayjs().startOf('day').subtract(2, 'day');

      return searchRequests.filter((searchRequest) => dayjs(searchRequest.date).isAfter(dayBeforeYesterday));
    }

    return searchRequests;
  }

  static delete(request: RecentSearchRequestType) {
    const searchRequests = FlightSearchHistoryLocalStorageHelper.get();

    _.remove(searchRequests, (curRequest) => _.isEqual(curRequest, request));

    store.set(FLIGHT_STATUS_CACHE_KEY, JSON.stringify(searchRequests));
  }

  static save(request: RecentSearchRequestType) {
    const searchRequests = FlightSearchHistoryLocalStorageHelper.get();

    const keysToCompare = ['to', 'from', 'date', 'flightNumber'];
    const searchesAreDuplicate = (searchOne, searchTwo) => {
      const searchOneKeysToCompare = _.pick(searchOne, keysToCompare);
      const searchTwoKeysToCompare = _.pick(searchTwo, keysToCompare);

      return _.matches(searchOneKeysToCompare)(searchTwoKeysToCompare);
    };

    _.remove(searchRequests, (element) => searchesAreDuplicate(element, request));

    searchRequests.unshift(request);

    if (searchRequests.length > FlightSearchHistoryLocalStorageHelper.MAX_SIZE) {
      searchRequests.pop();
    }

    store.set(FLIGHT_STATUS_CACHE_KEY, JSON.stringify(searchRequests));
  }

  static reset() {
    store.set(FLIGHT_STATUS_CACHE_KEY, JSON.stringify([]));
  }
}

export default FlightSearchHistoryLocalStorageHelper;
