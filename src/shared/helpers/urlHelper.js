import _ from 'lodash';
import { airBookingOldRoutes, airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes';
import { airCancelOldRoutes, airCancelRoutes } from 'src/airCancel/constants/airCancelRoutes';
import { airChangeOldRoutes, airChangeRoutes } from 'src/airChange/constants/airChangeRoutes.js';
import { airReaccomOldRoutes, airReaccomRoutes } from 'src/airChange/constants/airReaccomRoutes';
import { airUpgradeOldRoutes, airUpgradeRoutes } from 'src/airUpgrade/constants/airUpgradeRoutes';
import { carBookingOldRoutes, carBookingRoutes } from 'src/carBooking/constants/carBookingRoutes';
import { carCancelOldRoutes, carCancelRoutes } from 'src/carCancel/constants/carCancelRoutes';
import { checkInOldRoutes, checkInRoutes } from 'src/checkIn/constants/checkInRoutes';
import { companionOldRoutes, companionRoutes } from 'src/companion/constants/companionRoutes';
import { earlyBirdOldRoutes, earlyBirdRoutes } from 'src/earlyBird/constants/earlyBirdRoutes';
import { enrollOldRoutes, enrollRoutes } from 'src/enroll/constants/enrollRoutes';
import { flightStatusOldRoutes, flightStatusRoutes } from 'src/flightStatus/constants/flightStatusRoutes';
import { myAccountOldRoutes, myAccountRoutes } from 'src/myAccount/constants/myAccountRoutes';
import { sameDayOldRoutes, sameDayRoutes } from 'src/sameDay/constants/sameDayRoutes';
import { initialRouteIndex } from 'src/shared/constants/routeFlow';
import SharedConstants from 'src/shared/constants/sharedConstants';
import BrowserObject from 'src/shared/helpers/browserObject';
import { isEmpty, isObject } from 'src/shared/helpers/jsUtils';
import { getCurrentAppFlow } from 'src/shared/selectors/appSelector';
import { travelFundsOldRoutes, travelFundsRoutes } from 'src/travelFunds/constants/travelFundsRoutes';
import { upgradedBoardingOldRoutes, upgradedBoardingRoutes } from 'src/upgradedBoarding/constants/upgradedBoardingRoutes';
import { viewReservationOldRoutes, viewReservationRoutes } from 'src/viewReservation/constants/viewReservationRoutes';

export const updateQueryStringParameter = (uri, key, value) => {
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';

  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${value}$2`);
  } else {
    return `${uri + separator + key}=${value}`;
  }
};

export const getQueryStringParameterByKey = (key, uriSearch = BrowserObject.location.search) => {
  key = key.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line no-useless-escape
  const regex = new RegExp(`[?&]${key}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(uriSearch);

  if (!results) return null;

  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const mergeQuery = (query, uriSearch) => {
  const existingQuery = getQueryObject(uriSearch);

  return _.merge({}, existingQuery, query);
};

export const combineUri = (uri, query) => {
  const queryString = param(query);
  const urlPath = uri.split('?')[0];

  return queryString.trim() ? `${urlPath}?${queryString}` : urlPath;
};

export const removeQueryByKey = (queryKey, uri) => {
  const query = _.omit(getQueryObject(uri), queryKey);

  return combineUri(uri, query);
};

export const getQueryString = (uri) => {
  const matchResults = uri.match(/\?(.*)/i);

  if (matchResults && matchResults.length === 2) {
    return matchResults[1];
  } else {
    return '';
  }
};

export const getQueryObject = (uri) => {
  const queryString = getQueryString(uri) || '';

  const valuePairs = _.compact(queryString.split('&')).map((keyValue) => keyValue.split('='));

  return valuePairs.reduce((result, pair) => ({
    ...result,
    [pair[0]]: pair[1]
  }), {});
};

export const param = (obj) => {
  const encodeKeyValue = function (keyPrefix, key, value) {
    let tempKey = key;

    if (keyPrefix) {
      tempKey = `${keyPrefix}[${key}]`;
    }

    return `${encodeURIComponent(tempKey)}=${encodeURIComponent(value)}`;
  };

  const mapKeyValueToString = function (keyValue, keyPrefix) {
    return _.chain(keyValue)
      .omitBy(_.isNil)
      .map((value, key) => {
        if (Array.isArray(value)) {
          return _.chain(value)
            .transform((result, item) => {
              if (typeof item === 'object') {
                result.push(mapKeyValueToString(item, `${key}[]`));
              } else {
                result.push(encodeKeyValue(keyPrefix, `${key}[]`, item));
              }
            }, [])
            .join('&')
            .value();
        } else if (typeof value === 'object') {
          return _.chain(value)
            .keys()
            .transform((result, itemKey) => {
              if (typeof value[itemKey] === 'object') {
                result.push(mapKeyValueToString(value[itemKey], `${key}[${itemKey}]`));
              } else {
                result.push(encodeKeyValue(keyPrefix, `${key}[${itemKey}]`, value[itemKey]));
              }
            }, [])
            .join('&')
            .value();
        }

        if (!isEmpty(keyPrefix) && Array.isArray(keyValue)) {
          // We don't need the extra index for array which is inside of a object.
          return encodeKeyValue(keyPrefix, '', value);
        } else {
          return encodeKeyValue(keyPrefix, key, value);
        }
      })
      .join('&')
      .value();
  };

  return mapKeyValueToString(obj);
};

export const getNormalizedPageId = () => {
  const { location } = BrowserObject;

  return location.pathname
    .split('/')
    .filter((text) => text?.length)
    .join('-')
    .replace('.html', '');
};

export const removeInitialForwardSlash = (link) => (link && link.startsWith('/') ? link.substring(1) : link);

const { APP_FLOWS: { AIR_BOOKING, AIR_CANCEL, AIR_CHANGE, AIR_REACCOM, AIR_UPGRADE, CAR_BOOKING, CAR_CANCEL, CHECK_IN, COMPANION, EARLYBIRD, ENROLL, FLIGHT_STATUS, LOW_FARE_CALENDAR, MY_ACCOUNT, SAME_DAY, TRAVEL_FUNDS, UPGRADED_BOARDING, VIEW_RESERVATION } } = SharedConstants;

export const isOnOldRoute = () => {
  const { location } = BrowserObject;
  const pathName = location && location.pathname;
  const airBookingPathNameExp = /\b(shopping|pricing|review|passengers|confirmation|irnInfo|addManualIrn)\b/;
  const airUpgradePathNameExp = /^\/air\/upgrade(\/select-bounds)?$/;
  const earlyBirdPathNameExp = /\b(checkin)\b/;
  const htmlExtensionExp = /html/;

  const isOnOldAirBookingRoute = airBookingPathNameExp.test(pathName) && !htmlExtensionExp.test(pathName);
  const isOnOldMyAccountRoute = pathName.includes('my-account');
  const isOnOldAirCancelRoute = !pathName.includes('cancel-reservation');
  const isOnOldAirReaccomRoute = !pathName.includes('air/reaccom') && !htmlExtensionExp.test(pathName);
  const isOnOldCarBookingRoute = !htmlExtensionExp.test(pathName);
  const isOnOldCarCancelRoute = pathName.includes('car/cancel') && !htmlExtensionExp.test(pathName);
  const airChangePathNameExp = new RegExp(Object.keys(airChangeOldRoutes)
    .map(route => {
      const routeName = airChangeOldRoutes[route];
      const airChangeRoute = isObject(routeName) ?
        routeName?.canonicalPath ?? routeName[Object.keys(routeName)[initialRouteIndex]]
        : routeName;

      return `^${airChangeRoute.replace(/:[a-zA-Z]+/g, '([a-zA-Z-]+)')}$`;
    })
    .join('|'));
  const isOnOldAirChangeRoute = airChangePathNameExp.test(pathName) && !htmlExtensionExp.test(pathName);
  const viewReservationPathNameExp = /view-reservation/;
  const isOnOldEnrollRoute = !pathName.includes('account');
  const isOnOldFlightStatusRoute = !pathName.includes('air/flight-status');
  const isOnOldViewReservationRoute = viewReservationPathNameExp.test(pathName) && !htmlExtensionExp.test(pathName);
  const isOnOldCompanionRoute = pathName.includes('companion');
  const travelFundsPathNameExp = /^\/travel-funds\/(look-up|transfer-funds(\/confirmation)?)$/;
  const isOnOldTravelFundsRoute = travelFundsPathNameExp.test(pathName);
  const isOnOldEarlyBirdRoute = earlyBirdPathNameExp.test(pathName) && !htmlExtensionExp.test(pathName);
  const isOnOldAirUpgradeRoute = airUpgradePathNameExp.test(pathName);
  const isOnOldCheckInRoute = pathName.includes('check-in') && !htmlExtensionExp.test(pathName) && !pathName.includes('air/check-in');
  const isOnOldUpgradedBoardingRoute = !htmlExtensionExp.test(pathName);

  switch (getCurrentAppFlow()) {
    case AIR_BOOKING:
    case LOW_FARE_CALENDAR:
      return isOnOldAirBookingRoute;
    case AIR_CANCEL:
      return isOnOldAirCancelRoute;
    case AIR_CHANGE:
      return isOnOldAirChangeRoute;
    case AIR_REACCOM:
      return isOnOldAirReaccomRoute;
    case AIR_UPGRADE:
      return isOnOldAirUpgradeRoute;
    case CAR_BOOKING:
      return isOnOldCarBookingRoute;
    case CAR_CANCEL:
      return isOnOldCarCancelRoute;
    case CHECK_IN:
      return isOnOldCheckInRoute;
    case COMPANION:
      return isOnOldCompanionRoute;
    case EARLYBIRD:
      return isOnOldEarlyBirdRoute;
    case ENROLL:
      return isOnOldEnrollRoute;
    case FLIGHT_STATUS:
      return isOnOldFlightStatusRoute;
    case MY_ACCOUNT:
      return isOnOldMyAccountRoute;
    case TRAVEL_FUNDS:
      return isOnOldTravelFundsRoute;
    case UPGRADED_BOARDING:
      return isOnOldUpgradedBoardingRoute;
    case VIEW_RESERVATION:
      return isOnOldViewReservationRoute;

    default:
      return false;
  }
};

export const getNormalizedRoute = ({ routeName }, includeAllRoutes = false) => {
  let currentNewRoutes;
  let currentOldRoutes;

  switch (getCurrentAppFlow()) {
    case AIR_BOOKING:
    case LOW_FARE_CALENDAR:
      currentNewRoutes = airBookingRoutes;
      currentOldRoutes = airBookingOldRoutes;
      break;
    case AIR_CANCEL:
      currentNewRoutes = airCancelRoutes;
      currentOldRoutes = airCancelOldRoutes;
      break;
    case AIR_CHANGE:
      currentNewRoutes = airChangeRoutes;
      currentOldRoutes = airChangeOldRoutes;
      break;
    case AIR_REACCOM:
      currentNewRoutes = airReaccomRoutes;
      currentOldRoutes = airReaccomOldRoutes;
      break;
    case AIR_UPGRADE:
      currentNewRoutes = airUpgradeRoutes;
      currentOldRoutes = airUpgradeOldRoutes;
      break;
    case CAR_BOOKING:
      currentNewRoutes = carBookingRoutes;
      currentOldRoutes = carBookingOldRoutes;
      break;
    case CAR_CANCEL:
      currentNewRoutes = carCancelRoutes;
      currentOldRoutes = carCancelOldRoutes;
      break;
    case CHECK_IN:
      currentNewRoutes = checkInRoutes;
      currentOldRoutes = checkInOldRoutes;
      break;
    case COMPANION:
      currentNewRoutes = companionRoutes;
      currentOldRoutes = companionOldRoutes;
      break;
    case EARLYBIRD: 
      currentNewRoutes = earlyBirdRoutes;
      currentOldRoutes = earlyBirdOldRoutes;
      break;
    case ENROLL:
      currentNewRoutes = enrollRoutes;
      currentOldRoutes = enrollOldRoutes;
      break;
    case FLIGHT_STATUS:
      currentNewRoutes = flightStatusRoutes;
      currentOldRoutes = flightStatusOldRoutes;
      break;
    case MY_ACCOUNT:
      currentNewRoutes = myAccountRoutes;
      currentOldRoutes = myAccountOldRoutes;
      break;
    case SAME_DAY:
      currentNewRoutes = sameDayRoutes;
      currentOldRoutes = sameDayOldRoutes;
      break;
    case TRAVEL_FUNDS:
      currentNewRoutes = travelFundsRoutes;
      currentOldRoutes = travelFundsOldRoutes;
      break;
    case UPGRADED_BOARDING:
      currentNewRoutes = upgradedBoardingRoutes;
      currentOldRoutes = upgradedBoardingOldRoutes;
      break;
    case VIEW_RESERVATION:
      currentNewRoutes = viewReservationRoutes;
      currentOldRoutes = viewReservationOldRoutes;
      break;

    default:
      break;
  }

  if (typeof currentOldRoutes === 'undefined' || typeof currentNewRoutes === 'undefined') return '/';

  if (isOnOldRoute()) {
    const currentOldRoute = currentOldRoutes[routeName];

    const setRoute = isObject(currentOldRoute) ?
      (includeAllRoutes ?
        currentOldRoute
        : currentOldRoute?.canonicalPath ?? currentOldRoute[Object.keys(currentOldRoute)[initialRouteIndex]])
      : currentOldRoute;

    return setRoute ?? '/';
  } else {
    const currentNewRoute = currentNewRoutes[routeName];

    const setRoute = isObject(currentNewRoute) ?
      (includeAllRoutes ?
        currentNewRoute
        : currentNewRoute?.canonicalPath ?? currentNewRoute[Object.keys(currentNewRoute)[initialRouteIndex]])
      : currentNewRoute;

    return setRoute ?? '/';
  }
};
