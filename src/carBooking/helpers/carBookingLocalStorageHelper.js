// @flow
import store2 from 'store2';
import _ from 'lodash';
import dayjs from 'dayjs';
import StoreWithExpiration from 'src/shared/helpers/storeWithExpiration';
import CacheConfig from 'src/shared/cache/cacheConfig';
import { compareSearchRequest, removeExtraKeys } from 'src/carBooking/helpers/carBookingSearchRequestHelper';
import StorageKeys from 'src/shared/helpers/storageKeys';

import type {
  CarLocationResponseType,
  CarVendorType,
  SearchRequestType,
  FindCarsRequestType
} from 'src/carBooking/flow-typed/carBooking.types';

const { CAR_LOCATION_CACHE_KEY, CAR_VENDORS_CACHE_KEY, CAR_SEARCH_HISTORY_STORE_KEY } = StorageKeys;

class carBookingLocalStorageHelper {
  static getCarLocations(): Array<CarLocationResponseType> {
    return StoreWithExpiration.load(CAR_LOCATION_CACHE_KEY);
  }

  static saveCarLocations(carLocationResponse: Array<CarLocationResponseType>) {
    StoreWithExpiration.save.apply(null, [
      CAR_LOCATION_CACHE_KEY,
      carLocationResponse,
      CacheConfig.CAR_EXPIRED_MINUTES
    ]);
  }

  static getCarVendors(): Array<CarVendorType> {
    return StoreWithExpiration.load(CAR_VENDORS_CACHE_KEY);
  }

  static saveCarVendors(carVendorsResponse: Array<CarVendorType>) {
    StoreWithExpiration.save.apply(null, [CAR_VENDORS_CACHE_KEY, carVendorsResponse, CacheConfig.CAR_EXPIRED_MINUTES]);
  }

  static loadCarRecentSearches(): Array<SearchRequestType> {
    const requestsFromStore = store2.get(CAR_SEARCH_HISTORY_STORE_KEY) || [];

    return this._removeExpiredSearches(requestsFromStore);
  }

  static saveCarRecentSearch(findCarRequest: FindCarsRequestType) {
    const searchRequests = this.loadCarRecentSearches();

    this._removeExistingSearches(searchRequests, findCarRequest);

    searchRequests.unshift(removeExtraKeys(findCarRequest));

    const maxSearchesToSave = 20;

    if (searchRequests.length > maxSearchesToSave) {
      searchRequests.pop();
    }

    store2.set(CAR_SEARCH_HISTORY_STORE_KEY, searchRequests);
  }

  static deleteCarRecentSearch(searchRequests: Array<SearchRequestType>, indexToDelete: number) {
    const filteredRequests = _.filter(
      searchRequests,
      (searchRequest: SearchRequestType, index: number) => indexToDelete !== index
    );

    store2.set(CAR_SEARCH_HISTORY_STORE_KEY, filteredRequests);
  }

  static _removeExpiredSearches(searchRequests: Array<SearchRequestType>) {
    _.remove(searchRequests, (request) => this._isExpired(request.pickUpDate));

    return searchRequests;
  }

  static _removeExistingSearches(searchRequests: Array<SearchRequestType>, newRequest: SearchRequestType) {
    _.remove(searchRequests, (request) => compareSearchRequest(request, newRequest));

    return searchRequests;
  }

  static _isExpired(pickUpDate: string) {
    const today = dayjs();

    return dayjs(pickUpDate).isBefore(today, 'day');
  }
}

export default carBookingLocalStorageHelper;
