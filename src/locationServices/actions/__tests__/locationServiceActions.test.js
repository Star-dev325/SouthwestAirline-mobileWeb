jest.mock('src/shared/helpers/browserObject', () => ({
  location: { pathname: 'test' },
  navigator: {
    onLine: true,
    geolocation: {
      getCurrentPosition: jest.fn().mockImplementation(() => Promise.resolve('true'))
    }
  },
  window: { navigator: { onLine: true } }
}));
jest.mock('src/locationServices/helpers/messageHelper', () => ({
  getPermissionErrorMessageBasedOnPhoneType: jest.fn()
}));
jest.mock('src/shared/api/locationServiceApi', () => ({
  fetchNearestAirportWithCoordinates: jest.fn()
}));

import BrowserObject from 'src/shared/helpers/browserObject';
import * as LocationServiceActions from 'src/locationServices/actions';
import * as locationServiceApi from 'src/shared/api/locationServiceApi';
import { getPermissionErrorMessageBasedOnPhoneType } from 'src/locationServices/helpers/messageHelper';

describe('LocationServiceActions', () => {
  const deviceErrorMessage = 'Device Error Message';
  const locationServiceErrorMessage = 'LOCATION_SERVICES__UNABLE_TO_RETRIEVE_LOCATION';
  const setupNavigatorGetCurrentPosition = (callback) => {
    BrowserObject.navigator.geolocation.getCurrentPosition.mockImplementationOnce((successCb, errorCb) =>
      callback(successCb, errorCb)
    );
  };
  const setupFetchNearestAirportWithCoordinatesReject = (response) => {
    locationServiceApi.fetchNearestAirportWithCoordinates.mockImplementationOnce(() => Promise.reject(response));
  };
  const setupFetchNearestAirportWithCoordinatesResolve = (response) => {
    locationServiceApi.fetchNearestAirportWithCoordinates.mockImplementationOnce(() => Promise.resolve(response));
  };
  const mockIosError = { message: 'iOS error', code: '1' };
  const mockAndroidError = { message: 'Android error', code: '1' };
  let location;

  beforeEach(() => {
    location = { coords: { latitude: 100, longitude: 100 } };

    getPermissionErrorMessageBasedOnPhoneType.mockImplementation(() => deviceErrorMessage);

    jest.clearAllMocks();
  });

  describe('getPhoneLocation', () => {
    it('should return geo location when when getCurrentPosition is success', async () => {
      setupNavigatorGetCurrentPosition((successCb) => successCb(location));

      const response = await LocationServiceActions.getPhoneLocationForWebView();

      expect(response).toEqual(location);
    });

    it('should return iOS specific error when getCurrentPosition on iOS fails with error code 1 permission denied', async () => {
      setupNavigatorGetCurrentPosition((successCb, errorCb) => {
        errorCb({ code: 1 });
      });

      try {
        await LocationServiceActions.getPhoneLocation();
      } catch (error) {
        expect(error.message).toEqual(deviceErrorMessage);
      }
    });

    it('should return Android specific error when getCurrentPosition on Android fails with error code 1 permission denied', async () => {
      setupNavigatorGetCurrentPosition((successCb, errorCb) => {
        errorCb({ code: 1 });
      });

      try {
        await LocationServiceActions.getPhoneLocation();
      } catch (error) {
        expect(error.message).toEqual(deviceErrorMessage);
      }
    });

    it('should return geo location when navigator getCurrentPosition fails with error code 2 position unavailable', async () => {
      setupNavigatorGetCurrentPosition((successCb, errorCb) => {
        errorCb({ code: 2 });
      });

      try {
        await LocationServiceActions.getPhoneLocation();
      } catch (error) {
        expect(error.message).toEqual(locationServiceErrorMessage);
      }
    });
  });

  describe('getPhoneLocationForWebView', () => {
    it('should return geo location when when getCurrentPosition is success', async () => {
      setupNavigatorGetCurrentPosition((successCb) => successCb(location));

      const response = await LocationServiceActions.getPhoneLocationForWebView();

      expect(response).toEqual(location);
    });

    it('should return no error when getCurrentPosition on iOS fails with error code 1 permission denied in a Web View', async () => {
      setupNavigatorGetCurrentPosition((successCb, errorCb) => errorCb(mockIosError));

      try {
        await LocationServiceActions.getPhoneLocationForWebView();
      } catch (error) {
        expect(error).toEqual(mockIosError);
      }
    });

    it('should return no error when getCurrentPosition on Android fails with error code 1 permission denied in a Web View', async () => {
      setupNavigatorGetCurrentPosition((successCb, errorCb) => errorCb(mockAndroidError));

      try {
        await LocationServiceActions.getPhoneLocationForWebView();
      } catch (error) {
        expect(error).toEqual(mockAndroidError);
      }
    });

    it('should return no error when navigator getCurrentPosition fails with error code 2 position unavailable in a Web View', async () => {
      setupNavigatorGetCurrentPosition((successCb, errorCb) => errorCb({ code: '2' }));

      try {
        await LocationServiceActions.getPhoneLocationForWebView();
      } catch (error) {
        expect(error.code).toEqual('2');
      }
    });
  });

  describe('fetchNearestAirportWithCoordinates', () => {
    it('should return Api response when fetchNearestAirportWithCoordinates Api returns successfully', async () => {
      setupFetchNearestAirportWithCoordinatesResolve('true');
      const response = await LocationServiceActions.fetchNearestAirportWithCoordinates(10, 10);

      expect(response).toEqual('true');
    });

    it('should translate Api error when fetchNearestAirportWithCoordinates Api fails with 503599340 SITA error', async () => {
      setupFetchNearestAirportWithCoordinatesResolve({
        responseJSON: {
          code: 503599340,
          message: 'SITA Error'
        }
      });

      const response = await LocationServiceActions.fetchNearestAirportWithCoordinates(10, 10);

      expect(response).toEqual({
        responseJSON: {
          code: 503599340,
          message: 'SITA Error'
        }
      });
    });

    it('should translate Api error when fetchNearestAirportWithCoordinates Api fails with 400307624 NO NEAREST SWA AIRPORT error', async () => {
      setupFetchNearestAirportWithCoordinatesReject({
        responseJSON: {
          code: 400307624,
          message: 'NO NEAREST SWA AIRPORT'
        }
      });

      try {
        await LocationServiceActions.fetchNearestAirportWithCoordinates(10, 10);
      } catch (error) {
        expect(error).toEqual({
          responseJSON: {
            code: 400307624,
            message: 'NO NEAREST SWA AIRPORT'
          }
        });
      }
    });

    it('should return Api error when fetchNearestAirportWithCoordinates Api fails with error other than SITA or SWA NEAREST AIRPORT error', async () => {
      setupFetchNearestAirportWithCoordinatesReject({
        responseJSON: {
          code: 999,
          message: 'Some Error'
        }
      });

      try {
        await LocationServiceActions.fetchNearestAirportWithCoordinates(10, 10);
      } catch (error) {
        expect(error).toEqual({
          responseJSON: {
            code: 999,
            message: 'Some Error'
          }
        });
      }
    });
  });
});