import _ from 'lodash';
import { getPermissionErrorMessageBasedOnPhoneType } from 'src/locationServices/helpers/messageHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import { POSITION_ERROR, SITA_FAILURE, NO_NEAREST_SWA_AIRPORT } from 'src/shared/constants/errorCodes';
import i18n from '@swa-ui/locale';
import { containsApiErrorCodes } from 'src/shared/helpers/errorCodesHelper';
import * as LocationServiceApi from 'src/shared/api/locationServiceApi';
import LocationServicesActionTypes, {
  apiActionCreator
} from 'src/locationServices/actions/locationServicesActionTypes';
import { store } from 'src/shared/redux/createStore';

const { navigator } = BrowserObject;
const { PERMISSION_DENIED } = POSITION_ERROR;
const currentPositionOptions = { timeout: 90000, maximumAge: 0 };
const { fetchLocation, fetchLocationSuccess, fetchLocationFailed } = apiActionCreator(
  LocationServicesActionTypes.LOCATION_SERVICE__FETCH_LOCATION
);

export const getPhoneLocation = () => {
  store.dispatch(fetchLocation());

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        if (response) {
          resolve(response);
          store.dispatch(fetchLocationSuccess());
        }
      },
      (error) => {
        if (error) {
          if (!navigator.onLine) {
            reject(error);
          }
          const errorCode = _.get(error, 'code');
          const isPermissionDeniedError = errorCode === PERMISSION_DENIED;

          if (isPermissionDeniedError) {
            reject(new Error(getPermissionErrorMessageBasedOnPhoneType()));
          } else {
            reject(new Error(i18n('LOCATION_SERVICES__UNABLE_TO_RETRIEVE_LOCATION')));
          }
          store.dispatch(fetchLocationFailed());
        }
      },
      currentPositionOptions
    );
  });
};

export const getPhoneLocationForWebView = () => {
  store.dispatch(fetchLocation());

  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (response) => {
        if (response) {
          resolve(response);
          store.dispatch(fetchLocationSuccess());
        }
      },
      (error) => {
        reject(error);
        store.dispatch(fetchLocationFailed());
      },
      currentPositionOptions
    )
  );
};

const nearestAirportWithCoordinatesSuccess = (response) => response;
const nearestAirportWithCoordinatesError = (err) => {
  if (shouldOverrideLocationError(err)) {
    return new Error(i18n('SHARED__ERROR_MESSAGES__LOCATION_UNAVAILABLE'));
  } else {
    return err;
  }
};

export const fetchNearestAirportWithCoordinates = (longitude, latitude) => {
  store.dispatch(fetchLocation());

  return LocationServiceApi.fetchNearestAirportWithCoordinates(longitude, latitude)
    .then((response) => {
      store.dispatch(fetchLocationSuccess());

      return nearestAirportWithCoordinatesSuccess(response);
    })
    .catch((response) => {
      store.dispatch(fetchLocationFailed(nearestAirportWithCoordinatesError(response)));
    });
};
const shouldOverrideLocationError = (err) => {
  const containsSpecificErrorCode = containsApiErrorCodes(err, SITA_FAILURE, NO_NEAREST_SWA_AIRPORT);
  const isOnLine = navigator.onLine;

  return isOnLine && !containsSpecificErrorCode;
};
