import Q from 'q';
import _ from 'lodash';
import { createSha256Hash } from 'src/shared/helpers/hashHelper';
import localStorage from 'store2';
import StoreWithExpiration from 'src/shared/helpers/storeWithExpiration';
import CacheConfig from 'src/shared/cache/cacheConfig';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { getAppVersion } from 'src/shared/config/environmentConfig';
import UserNotLoginError from 'src/shared/errors/userNotLoginError';

const {
  ACCOUNT_INFO,
  AIRPORT_LIST_CACHE_KEY,
  CAR_LOCATION_CACHE_KEY,
  CAR_VENDORS_CACHE_KEY,
  PAYPAL_DATA_KEY,
  CHASE_SESSION_ID_KEY,
  CHASE_SWA_OFFERS_IDENTITY_KEY,
  LAST_BOOKABLE_DATE_CACHE_KEY,
  CHASE_INSTANT_CREDIT_RETURN_URL_KEY,
  CHASE_PREQUAL_OFFERS_KEY,
  PRODUCT_DEFINITIONS_CACHE_KEY,
  CORPORATE_BOOKING_SWITCH_INFO_CACHE_KEY,
  CALENDAR_SCHEDULE_MESSAGE_CACHE_KEY,
  USER_INFO_CACHE_KEY
} = StorageKeys;

const localStorageSaver = (key, expiredMinutes, timestampOverride) =>
  function (data) {
    const deferred = Q.defer();

    (function () {
      StoreWithExpiration.save.apply(null, [key, data, expiredMinutes, timestampOverride]);
      deferred.resolve(data);
    })();

    return deferred.promise;
  };

export const localStorageGetter = (key, error) =>
  function () {
    const deferred = Q.defer();

    (function () {
      const data = StoreWithExpiration.load(key);

      if (_.isNil(data)) {
        deferred.reject(error);
      } else {
        deferred.resolve(data);
      }
    })();

    return deferred.promise;
  };

export const validateAppVersion = () => {
  const currentAppVersion = getAppVersion();
  const storedAppVersion = localStorage.get('version');

  if (storedAppVersion !== currentAppVersion) {
    localStorage.clear();
    localStorage.set('version', currentAppVersion);
  }
};

export const saveCarLocations = (carLocations) => {
  const deferred = Q.defer();

  (function () {
    StoreWithExpiration.save(CAR_LOCATION_CACHE_KEY, carLocations, CacheConfig.CAR_EXPIRED_MINUTES);
    deferred.resolve(carLocations.locations);
  })();

  return deferred.promise;
};

export const saveChasePrequalOffers = (data, ttl, timestampOverride) =>
  localStorageSaver(CHASE_PREQUAL_OFFERS_KEY, ttl, timestampOverride)(data);

export const loadChasePrequalOffers = (shouldValidateAccount = true) =>
  localStorageGetter(CHASE_PREQUAL_OFFERS_KEY, `Can't find chasePrequalOffers from localStorage.`)().then((offers) => {
    const accountInfo = localStorage.get(ACCOUNT_INFO);
    const accountNumber = _.get(accountInfo, 'customerInfo.accountNumber');
    const accountNumberHashed = createSha256Hash(accountNumber);

    return !shouldValidateAccount || offers.accountNumber === accountNumberHashed
      ? offers
      : Promise.reject(new Error('Current account number and prequal account number are different.'));
  });
export const deleteChasePrequalOffers = () => deleteFromLocalStorage(CHASE_PREQUAL_OFFERS_KEY);

export const saveCorporateBookingSwitchInfo = (data) =>
  localStorageSaver(CORPORATE_BOOKING_SWITCH_INFO_CACHE_KEY, CacheConfig.CORPORATE_BOOKING_SWITCH_INFO)(data);
export const loadCorporateBookingSwitchInfo = () => StoreWithExpiration.load(CORPORATE_BOOKING_SWITCH_INFO_CACHE_KEY);

export const saveLastBookableDate = (data) =>
  localStorageSaver(LAST_BOOKABLE_DATE_CACHE_KEY, CacheConfig.LAST_BOOKABLE_DATE_MINUTES)(data);
export const loadLastBookableDate = () => StoreWithExpiration.load(LAST_BOOKABLE_DATE_CACHE_KEY);

export const saveAirports = (data) => localStorageSaver(AIRPORT_LIST_CACHE_KEY, CacheConfig.AIR_EXPIRED_MINUTES)(data);
export const loadAirports = () => StoreWithExpiration.load(AIRPORT_LIST_CACHE_KEY);

export const saveProductDefinitions = (data) =>
  localStorageSaver(PRODUCT_DEFINITIONS_CACHE_KEY, CacheConfig.PRODUCT_DEFINITIONS_EXPIRED_MINUTES)(data);
export const loadProductDefinitions = () => StoreWithExpiration.load(PRODUCT_DEFINITIONS_CACHE_KEY);

export const saveCarVendors = (data) => localStorageSaver(CAR_VENDORS_CACHE_KEY, CacheConfig.CAR_EXPIRED_MINUTES)(data);

export const hasPayPalData = () => isDataPresent(PAYPAL_DATA_KEY);

export const saveChaseSessionId = (data) =>
  localStorageSaver(CHASE_SESSION_ID_KEY, CacheConfig.CHASE_EXPIRED_MINUTES)(data);

export const saveSwaOffersIdentity = () => {
  const { offerIdentifier, swaOffersIdentitySource } = StoreWithExpiration.load(CHASE_PREQUAL_OFFERS_KEY) ?? {};
  const data = { offerIdentifier, swaOffersIdentitySource };

  offerIdentifier &&
    swaOffersIdentitySource &&
    localStorageSaver(CHASE_SWA_OFFERS_IDENTITY_KEY, CacheConfig.CHASE_EXPIRED_MINUTES)(data);
};

export const loadChaseSessionId = () =>
  localStorageGetter(CHASE_SESSION_ID_KEY, `Can't find chase session id from localStorage.`)();

export const saveChaseInstantCreditReturnUrl = (data) =>
  localStorageSaver(CHASE_INSTANT_CREDIT_RETURN_URL_KEY, CacheConfig.CHASE_EXPIRED_MINUTES)(data);

export const loadChaseInstantCreditReturnUrl = () =>
  localStorageGetter(
    CHASE_INSTANT_CREDIT_RETURN_URL_KEY,
    `Can't find chase instant credit return url from local storage`
  )();

export const saveCalendarScheduleMessage = (data) =>
  localStorageSaver(CALENDAR_SCHEDULE_MESSAGE_CACHE_KEY, CacheConfig.CALENDAR_SCHEDULE_MESSAGE_EXPIRED_MINUTES)(data);
export const loadCalendarScheduleMessage = () => StoreWithExpiration.load(CALENDAR_SCHEDULE_MESSAGE_CACHE_KEY);

export const saveUserInfo = (data) =>
  localStorageSaver(USER_INFO_CACHE_KEY, CacheConfig.USER_INFO_EXPIRED_MINUTES)(data);
export const loadUserInfo = () => StoreWithExpiration.load(USER_INFO_CACHE_KEY);
export const deleteUserInfo = () => deleteFromLocalStorage(USER_INFO_CACHE_KEY);

export const isDataPresent = (key) => StoreWithExpiration.load(key);

export const deleteFromLocalStorage = (key) => {
  localStorage.remove(key);
};

export const getAccountNumber = () =>
  new Promise((resolve, reject) => {
    const accountInfo = localStorage.get(ACCOUNT_INFO);
    const accountNumber = _.get(accountInfo, 'customerInfo.accountNumber');

    if (accountNumber) {
      resolve(accountNumber);
    } else {
      reject(new UserNotLoginError());
    }
  });

export const getSwaOffersIdentity = () => StoreWithExpiration.load(CHASE_SWA_OFFERS_IDENTITY_KEY) ?? {};
