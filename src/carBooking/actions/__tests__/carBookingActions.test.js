jest.mock('src/carBooking/helpers/carBookingLocalStorageHelper');
jest.mock('src/carBooking/transformers/carBookingPurchaseTransformer');
jest.mock('src/carBooking/transformers/carReservationTransformer');
jest.mock('src/shared/api/accountsApi');
jest.mock('src/shared/api/carBookingApi');
jest.mock('src/wcm/actions/wcmActions');

import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import { carBookingOldRoutes, carBookingRoutes } from 'src/carBooking/constants/carBookingRoutes';
import CarBookingLocalStorageHelper from 'src/carBooking/helpers/carBookingLocalStorageHelper';
import * as CarBookingPurchaseTransformer from 'src/carBooking/transformers/carBookingPurchaseTransformer';
import * as CarReservationTransformer from 'src/carBooking/transformers/carReservationTransformer';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as CarBookingApi from 'src/shared/api/carBookingApi';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as HapticFeedbackHelper from 'src/shared/helpers/hapticFeedbackHelper';
import { noop } from 'src/shared/helpers/jsUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import createMockStore from 'test/unit/helpers/createMockStore';
import waitFor from 'test/unit/helpers/waitFor';

const { confirmation: carBookingConfirmation, index: carBookingIndex } = carBookingOldRoutes;
const { window } = BrowserObject;
const AccountsApiMock = jest.mocked(AccountsApi);
const CarBookingApiMock = jest.mocked(CarBookingApi);
const CarBookingLocalStorageHelperMock = jest.mocked(CarBookingLocalStorageHelper);
const CarBookingPurchaseTransformerMock = jest.mocked(CarBookingPurchaseTransformer);
const mockStore = createMockStore();
const WcmActionsMock = jest.mocked(WcmActions);

jest.mocked(CarReservationTransformer);

window.navigator.vibrate = noop;

describe('CarBookingActions', () => {
  let expectedStartNewFlowActions;
  let searchRequest;
  let store;

  beforeEach(() => {
    store = mockStore({});
    CarBookingLocalStorageHelperMock.getCarLocations.mockReturnValue('response');
    CarBookingLocalStorageHelperMock.saveCarLocations.mockReturnValue();
    CarBookingLocalStorageHelperMock.getCarVendors.mockReturnValue('response');
    CarBookingLocalStorageHelperMock.saveCarVendors.mockReturnValue();
    CarBookingLocalStorageHelperMock.saveCarRecentSearch.mockReturnValue();
    CarBookingLocalStorageHelperMock.deleteCarRecentSearch.mockReturnValue();
    CarBookingLocalStorageHelperMock.loadCarRecentSearches.mockReturnValue('loadRecentSearchesResponse');
    CarBookingLocalStorageHelperMock.transformToCarReservation;
    WcmActionsMock.retrieveCarVendorImages.mockReturnValue({
      type: 'FAKE_WCM_RETRIEVE_VENDOR_IMAGES_ACTION'
    });
    expectedStartNewFlowActions = [
      {
        flowName: 'carBooking',
        status: 'initial',
        type: 'SET_FLOW_STATUS'
      },
      {
        type: 'CAR_BOOKING__RESET_FLOW_DATA'
      },
      {
        type: 'FAKE_WCM_RETRIEVE_VENDOR_IMAGES_ACTION'
      },
      {
        isFetching: true,
        type: 'CAR_BOOKING__FETCH_CAR_VENDORS'
      },
      {
        isFetching: false,
        response: 'response',
        type: 'CAR_BOOKING__FETCH_CAR_VENDORS_SUCCESS'
      },
      {
        isFetching: true,
        type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS'
      },
      {
        isFetching: false,
        response: 'response',
        type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS_SUCCESS'
      },
      {
        searchRequests: 'loadRecentSearchesResponse',
        type: 'CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS'
      }
    ];
    searchRequest = {
      dropOff: 'HOU',
      dropOffDate: '2019-01-25',
      dropOffTime: '10:30PM',
      pickUp: 'DAL',
      pickUpDate: '2019-01-20',
      pickUpTime: '10:30AM'
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('retrieveCarLocations', () => {
    it('should load data from local storage, dispatch success action and not call chapi when data exists in local storage', () => {
      store.dispatch(CarBookingActions.retrieveCarLocations());

      expect(CarBookingLocalStorageHelperMock.getCarLocations).toHaveBeenCalled();
      expect(CarBookingApiMock.retrieveLocations).not.toHaveBeenCalled();

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS'
        },
        {
          isFetching: false,
          response: 'response',
          type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS_SUCCESS'        
        }
      ]);
    });

    it('should not load data from local storage, dispatch success action and call chapi when data does not exist in local storage and chapi call is success', () => {
      CarBookingLocalStorageHelperMock.getCarLocations.mockReturnValue({});
      CarBookingApiMock.retrieveLocations.mockResolvedValue('response');

      store.dispatch(CarBookingActions.retrieveCarLocations()).then(() => {
        expect(CarBookingLocalStorageHelperMock.getCarLocations).toHaveBeenCalled();
        expect(CarBookingApiMock.retrieveLocations).toHaveBeenCalled();

        const actions = store.getActions();

        expect(actions).toEqual([
          {
            isFetching: true,
            type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS'
          },
          {
            isFetching: false,
            response: 'response',
            type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS_SUCCESS'
          }
        ]);
      });
    });

    it('should not load data from local storage, dispatch failed action and call chapi when data does not exist in local storage and chapi call fails', () => {
      CarBookingLocalStorageHelperMock.getCarLocations.mockReturnValue({});
      CarBookingApiMock.retrieveLocations.mockRejectedValue('error');

      store.dispatch(CarBookingActions.retrieveCarLocations()).then(() => {
        expect(CarBookingLocalStorageHelperMock.getCarLocations).toHaveBeenCalled();
        expect(CarBookingApiMock.retrieveLocations).toHaveBeenCalled();

        const actions = store.getActions();

        expect(actions).toEqual([
          {
            isFetching: true,
            type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS'
          },
          {
            error: 'error',
            isFetching: false,
            type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS_FAILED'
          }
        ]);
      });
    });
  });

  describe('retrieveCarVendors', () => {
    it('should load data from local storage, dispatch success action and not call chapi when data exists in local storage', () => {
      store.dispatch(CarBookingActions.retrieveCarVendors());

      expect(CarBookingLocalStorageHelper.getCarVendors).toHaveBeenCalled();
      expect(CarBookingApiMock.retrieveCarVendors).not.toHaveBeenCalled();

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_CAR_VENDORS'
        },
        {
          isFetching: false,
          response: 'response',
          type: 'CAR_BOOKING__FETCH_CAR_VENDORS_SUCCESS'
        }
      ]);
    });

    it('should not load data from local storage, dispatch success action and call chapi when data does not exist in local storage and chapi call is success', () => {
      CarBookingLocalStorageHelperMock.getCarVendors.mockReturnValue({});
      CarBookingApiMock.retrieveCarVendors.mockResolvedValue('response');

      store.dispatch(CarBookingActions.retrieveCarVendors()).then(() => {
        expect(CarBookingLocalStorageHelperMock.getCarVendors).toHaveBeenCalled();
        expect(CarBookingApiMock.retrieveCarVendors).toHaveBeenCalled();

        const actions = store.getActions();

        expect(actions).toEqual([
          {
            isFetching: true,
            type: 'CAR_BOOKING__FETCH_CAR_VENDORS'
          },
          {
            isFetching: false,
            response: 'response',
            type: 'CAR_BOOKING__FETCH_CAR_VENDORS_SUCCESS'
          }
        ]);
      });
    });

    it('should not load data from local storage, dispatch failed action and call chapi when data does not exist in local storage and chapi call fails', () => {
      CarBookingLocalStorageHelper.getCarVendors.mockReturnValue({});
      CarBookingApiMock.retrieveCarVendors.mockRejectedValue('error');

      store.dispatch(CarBookingActions.retrieveCarVendors()).then(() => {
        expect(CarBookingLocalStorageHelper.getCarVendors).toHaveBeenCalled();
        expect(CarBookingApiMock.retrieveCarVendors).toHaveBeenCalled();

        const actions = store.getActions();

        expect(actions).toEqual([
          {
            isFetching: true,
            type: 'CAR_BOOKING__FETCH_CAR_VENDORS'
          },
          {
            error: 'error',
            isFetching: false,
            type: 'CAR_BOOKING__FETCH_CAR_VENDORS_FAILED'
          }
        ]);
      });
    });
  });

  describe('findCars', () => {
    it('should dispatch flow status and success actions when chapi call is success', async () => {
      const request = 'request';
      const response = 'response';

      CarBookingApiMock.shopping.mockResolvedValue(response);

      await store.dispatch(CarBookingActions.findCars(request));

      expect(CarBookingApiMock.shopping).toHaveBeenCalled();
      expect(CarBookingLocalStorageHelperMock.saveCarRecentSearch).toHaveBeenCalledWith(request);
      expect(CarBookingLocalStorageHelperMock.loadCarRecentSearches).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_CARS'
        },
        {
          request,
          type: 'CAR_BOOKING__SAVE_FETCH_CARS_REQUEST'
        },
        {
          searchRequests: 'loadRecentSearchesResponse',
          type: 'CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS'
        },
        {
          flowName: 'carBooking',
          status: 'in_progress',
          type: 'SET_FLOW_STATUS'
        },
        {
          isFetching: false,
          response,
          type: 'CAR_BOOKING__FETCH_CARS_SUCCESS'
        },
        {
          payload: {
            args: [carBookingOldRoutes['select']],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should dispatch flow status and success actions when chapi call is success and ENABLE_URL_NORMALIZATION is false', async () => {
      store = mockStore({
        app: {
          toggles: {
            ENABLE_URL_NORMALIZATION: false
          }
        }
      });
      
      const request = 'request';
      const response = 'response';

      CarBookingApiMock.shopping.mockResolvedValue(response);

      await store.dispatch(CarBookingActions.findCars(request));

      expect(CarBookingApiMock.shopping).toHaveBeenCalled();
      expect(CarBookingLocalStorageHelperMock.saveCarRecentSearch).toHaveBeenCalledWith(request);
      expect(CarBookingLocalStorageHelperMock.loadCarRecentSearches).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_CARS'
        },
        {
          request,
          type: 'CAR_BOOKING__SAVE_FETCH_CARS_REQUEST'
        },
        {
          searchRequests: 'loadRecentSearchesResponse',
          type: 'CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS'
        },
        {
          flowName: 'carBooking',
          status: 'in_progress',
          type: 'SET_FLOW_STATUS'
        },
        {
          isFetching: false,
          response,
          type: 'CAR_BOOKING__FETCH_CARS_SUCCESS'
        },
        {
          payload: {
            args: [carBookingOldRoutes['select']],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should dispatch flow status and success actions when chapi call is success and ENABLE_URL_NORMALIZATION is true', async () => {
      store = mockStore({
        app: {
          toggles: {
            ENABLE_URL_NORMALIZATION: true
          }
        }
      });
      
      const request = 'request';
      const response = 'response';

      CarBookingApiMock.shopping.mockResolvedValue(response);

      await store.dispatch(CarBookingActions.findCars(request));

      expect(CarBookingApiMock.shopping).toHaveBeenCalled();
      expect(CarBookingLocalStorageHelperMock.saveCarRecentSearch).toHaveBeenCalledWith(request);
      expect(CarBookingLocalStorageHelperMock.loadCarRecentSearches).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_CARS'
        },
        {
          request,
          type: 'CAR_BOOKING__SAVE_FETCH_CARS_REQUEST'
        },
        {
          searchRequests: 'loadRecentSearchesResponse',
          type: 'CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS'
        },
        {
          flowName: 'carBooking',
          status: 'in_progress',
          type: 'SET_FLOW_STATUS'
        },
        {
          isFetching: false,
          response,
          type: 'CAR_BOOKING__FETCH_CARS_SUCCESS'
        },
        {
          payload: {
            args: [carBookingRoutes['select']],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should dispatch flow status and failed actions when chapi call failed', async () => {
      const error = 'error';
      const request = 'request';

      CarBookingApiMock.shopping.mockRejectedValue(error);

      await store.dispatch(CarBookingActions.findCars(request));

      expect(CarBookingApiMock.shopping).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_CARS'
        },
        {
          error,
          isFetching: false,
          type: 'CAR_BOOKING__FETCH_CARS_FAILED'
        }
      ]);
    });

    it('should not push to Car Booking Select Route if isDeeplink flag is true', async () => {
      store = mockStore({
        app: {
          toggles: {
            ENABLE_URL_NORMALIZATION: true
          }
        }
      });
      
      const request = 'request';
      const response = 'response';

      CarBookingApiMock.shopping.mockResolvedValue(response);

      await store.dispatch(CarBookingActions.findCars(request, true));

      expect(CarBookingApiMock.shopping).toHaveBeenCalled();
      expect(CarBookingLocalStorageHelperMock.saveCarRecentSearch).toHaveBeenCalledWith(request);
      expect(CarBookingLocalStorageHelperMock.loadCarRecentSearches).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_CARS'
        },
        {
          request,
          type: 'CAR_BOOKING__SAVE_FETCH_CARS_REQUEST'
        },
        {
          searchRequests: 'loadRecentSearchesResponse',
          type: 'CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS'
        },
        {
          flowName: 'carBooking',
          status: 'in_progress',
          type: 'SET_FLOW_STATUS'
        },
        {
          isFetching: false,
          response,
          type: 'CAR_BOOKING__FETCH_CARS_SUCCESS'
        }
      ]);
    });
  });

  describe('retrieveCarPricing', () => {
    it('should dispatch success action and transition to next page when chapi call returns success', async () => {
      const request = { productId: 'prod123' };
      const response = 'response';

      CarBookingApiMock.retrieveCarPricing.mockResolvedValue(response);

      await store.dispatch(CarBookingActions.retrieveCarPricing(request));

      expect(CarBookingApiMock.retrieveCarPricing).toHaveBeenCalledWith(request.productId, null);

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          request,
          type: 'CAR_BOOKING__FETCH_CAR_PRICING'
        },
        {
          carReservation: undefined,
          type: 'CAR_BOOKING__SAVE_CAR_RESERVATION'
        },
        {
          selectedCar: { productId: 'prod123' },
          type: 'CAR_BOOKING__SAVE_SELECTED_CAR'
        },
        {
          selectedExtras: [],
          type: 'CAR_BOOKING__SAVE_SELECTED_EXTRAS'
        },
        {
          isFetching: false,
          response,
          type: 'CAR_BOOKING__FETCH_CAR_PRICING_SUCCESS'
        },
        {
          payload: {
            args: [getNormalizedRoute({ routeName: 'price' })],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should dispatch success action and transition to next page when chapi call returns success', async () => {
      const queryParameters = {
        discount: [
          {
            code: 'CODE',
            type: 'DISCOUNT_CODE'
          }
        ]
      };
      const request = {
        appliedDiscount: {
          code: 'CODE',
          type: 'DISCOUNT_CODE'
        },
        productId: 'prod123'
      };
      const response = 'response';

      CarBookingApiMock.retrieveCarPricing.mockResolvedValue(response);

      await store.dispatch(CarBookingActions.retrieveCarPricing(request));

      expect(CarBookingApiMock.retrieveCarPricing).toHaveBeenCalledWith(request.productId, queryParameters);

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          request,
          type: 'CAR_BOOKING__FETCH_CAR_PRICING'
        },
        {
          carReservation: undefined,
          type: 'CAR_BOOKING__SAVE_CAR_RESERVATION'
        },
        {
          selectedCar: {
            appliedDiscount: {
              code: 'CODE',
              type: 'DISCOUNT_CODE'
            },
            productId: 'prod123'
          },
          type: 'CAR_BOOKING__SAVE_SELECTED_CAR'
        },
        {
          selectedExtras: [],
          type: 'CAR_BOOKING__SAVE_SELECTED_EXTRAS'
        },
        {
          isFetching: false,
          response,
          type: 'CAR_BOOKING__FETCH_CAR_PRICING_SUCCESS'
        },
        {
          payload: {
            args: [getNormalizedRoute({ routeName: 'price' })],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should dispatch failed action when chapi call fails', async () => {
      const error = 'error';
      const request = { productId: 'prod123' };

      CarBookingApiMock.retrieveCarPricing.mockRejectedValue(error);

      await store.dispatch(CarBookingActions.retrieveCarPricing(request));

      expect(CarBookingApiMock.retrieveCarPricing).toHaveBeenCalledWith(request.productId, null);

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          request,
          type: 'CAR_BOOKING__FETCH_CAR_PRICING'
        },
        {
          error,
          isFetching: false,
          type: 'CAR_BOOKING__FETCH_CAR_PRICING_FAILED'
        }
      ]);
    });
  });

  describe('reserveCar', () => {
    it('should dispatch success actions when chapi call is success', async () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/booking');
      BrowserObject.location = { pathname: '/car/booking' };
      const isLoggedIn = true;
      const request = 'request';
      const response = 'response';

      CarBookingApiMock.reserveCar.mockResolvedValue(response);

      await store.dispatch(CarBookingActions.reserveCar(request, isLoggedIn));

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          request: 'request',
          type: 'CAR_BOOKING__BOOK_CAR'
        },
        {
          isFetching: false,
          response: {
            confirmationEmail: '',
            confirmationNumber: undefined,
            driver: {
              firstName: undefined,
              lastName: undefined
            },
            purposeOfTravel: ''
          },
          type: 'CAR_BOOKING__BOOK_CAR_SUCCESS'
        },
        {
          flowName: 'carBooking',
          status: 'completed',
          type: 'SET_FLOW_STATUS'
        },
        {
          payload: {
            args: [carBookingConfirmation],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should play haptic feedback when reservation succeeds', async () => {
      const playHapticFeedbackMock = jest.spyOn(HapticFeedbackHelper, 'playHapticFeedback');

      CarBookingApiMock.reserveCar.mockResolvedValue({});
      await store.dispatch(CarBookingActions.reserveCar('request', true));

      expect(playHapticFeedbackMock).toHaveBeenCalled();
    });

    it('should dispatch failed actions when chapi call is fails', async () => {
      const isLoggedIn = true;
      const request = 'request';

      CarBookingApiMock.reserveCar.mockRejectedValue('error');

      await store.dispatch(CarBookingActions.reserveCar(request, isLoggedIn));

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          request: 'request',
          type: 'CAR_BOOKING__BOOK_CAR'
        },
        {
          error: 'error',
          isFetching: false,
          type: 'CAR_BOOKING__BOOK_CAR_FAILED'
        }
      ]);
    });
  });

  describe('retrieveVendorTermsAndConditions', () => {
    it('should dispatch the success actions when chapi call is success', async () => {
      const productId = 'productId';
      const response = 'response';

      CarBookingApiMock.retrieveCarPricing.mockResolvedValue(response);

      await store.dispatch(CarBookingActions.retrieveVendorTermsAndConditions(productId));

      expect(CarBookingApiMock.retrieveCarPricing).toHaveBeenCalledWith(productId);

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_VENDOR_TERMS_AND_CONDITIONS'
        },
        {
          isFetching: false,
          response,
          type: 'CAR_BOOKING__FETCH_VENDOR_TERMS_AND_CONDITIONS_SUCCESS'
        }
      ]);
    });

    it('should dispatch the failed actions when chapi call fails', async () => {
      const error = 'error';
      const productId = 'productId';

      CarBookingApiMock.retrieveCarPricing.mockRejectedValue(error);

      await store.dispatch(CarBookingActions.retrieveVendorTermsAndConditions(productId));

      expect(CarBookingApiMock.retrieveCarPricing).toHaveBeenCalledWith(productId);

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_VENDOR_TERMS_AND_CONDITIONS'
        },
        {
          error,
          isFetching: false,
          type: 'CAR_BOOKING__FETCH_VENDOR_TERMS_AND_CONDITIONS_FAILED'
        }
      ]);
    });
  });

  describe('loadUserAccountInfo', () => {
    const pushUrl = 'goto/url';

    it('should dispatch the success actions when chapi call is success ', async () => {
      const contactInfo = 'contactInfo';
      const driverInfo = 'driverInfo';
      const response = 'response';

      AccountsApiMock.fetchAccountInfo.mockResolvedValue(response);
      CarBookingPurchaseTransformerMock.transformToContactInfo.mockReturnValueOnce(contactInfo);
      CarBookingPurchaseTransformerMock.transformToDriverInfo.mockReturnValueOnce(driverInfo);

      await store.dispatch(CarBookingActions.loadUserAccountInfo(pushUrl));

      expect(AccountsApiMock.fetchAccountInfo).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_USER_ACCOUNT_INFO'
        },
        {
          driverInfo: 'driverInfo',
          type: 'CAR_BOOKING__SAVE_USER_ACCOUNT_DRIVER_INFO'
        },
        {
          contactInfo: 'contactInfo',
          type: 'CAR_BOOKING__SAVE_USER_ACCOUNT_CONTACT_INFO'
        },
        {
          isFetching: false,
          type: 'CAR_BOOKING__FETCH_USER_ACCOUNT_INFO_SUCCESS'
        },
        {
          payload: {
            args: [pushUrl],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should dispatch the success actions when chapi call is fails ', async () => {
      AccountsApiMock.fetchAccountInfo.mockRejectedValue('error');

      await store.dispatch(CarBookingActions.loadUserAccountInfo(pushUrl));

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_USER_ACCOUNT_INFO'
        },
        {
          error: 'error',
          isFetching: false,
          type: 'CAR_BOOKING__FETCH_USER_ACCOUNT_INFO_FAILED'
        }
      ]);
    });
  });

  describe('saveUserAccountInfo', () => {
    it('should dispatch saveUserAccountDriverInfo and saveUserAccountContactInfo actions', () => {
      const accountInfo = 'accountInfo';
      const contactInfo = 'contactInfo';
      const driverInfo = 'driverInfo';

      CarBookingPurchaseTransformerMock.transformToContactInfo.mockReturnValueOnce(contactInfo);
      CarBookingPurchaseTransformerMock.transformToDriverInfo.mockReturnValueOnce(driverInfo);

      store.dispatch(CarBookingActions.saveUserAccountInfo(accountInfo));

      expect(CarBookingPurchaseTransformerMock.transformToContactInfo).toHaveBeenCalledWith(accountInfo);
      expect(CarBookingPurchaseTransformerMock.transformToDriverInfo).toHaveBeenCalledWith(accountInfo);

      expect(store.getActions()).toEqual([
        {
          driverInfo,
          type: 'CAR_BOOKING__SAVE_USER_ACCOUNT_DRIVER_INFO'
        },
        {
          contactInfo,
          type: 'CAR_BOOKING__SAVE_USER_ACCOUNT_CONTACT_INFO'
        }
      ]);
    });
  });

  describe('saveRecentSearchRequest', () => {
    it('should dispatch saveRecentSearchRequest action', () => {
      const expectedAction = {
        searchRequest: 'searchRequest',
        type: 'CAR_BOOKING__SAVE_SELECTED_RECENT_SEARCH_REQUEST'
      };

      expect(CarBookingActions.saveSelectedRecentSearchRequest(expectedAction.searchRequest)).toEqual(
        expectedAction
      );
    });
  });

  describe('saveRecentSearchRequests', () => {
    it('should dispatch saveRecentSearchRequests action', () => {
      const expectedAction = {
        searchRequests: ['searchRequests'],
        type: 'CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS'
      };

      expect(CarBookingActions.saveRecentSearchRequests(expectedAction.searchRequests)).toEqual(expectedAction);
    });
  });

  describe('getRecentSearchesFromLocalStorage', () => {
    it('should dispatch saveRecentSearchRequests action', async () => {
      await store.dispatch(CarBookingActions.getRecentSearchesFromLocalStorage());

      expect(CarBookingLocalStorageHelperMock.loadCarRecentSearches).toHaveBeenCalled();
      expect(store.getActions()).toEqual([
        {
          searchRequests: 'loadRecentSearchesResponse',
          type: 'CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS'
        }
      ]);
    });
  });

  describe('deleteRecentSearchRequestFromLocalStorage', () => {
    it('should dispatch saveRecentSearchRequests action', async () => {
      const indexToDelete = 1;
      const searchRequests = [{}, {}];

      await store.dispatch(CarBookingActions.deleteRecentSearchRequestFromLocalStorage(searchRequests, indexToDelete));

      expect(CarBookingLocalStorageHelperMock.deleteCarRecentSearch).toHaveBeenCalledWith(searchRequests, indexToDelete);
      expect(CarBookingLocalStorageHelperMock.loadCarRecentSearches).toHaveBeenCalled();
      expect(store.getActions()).toEqual([
        {
          searchRequests: 'loadRecentSearchesResponse',
          type: 'CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS'
        }
      ]);
    });
  });

  describe('saveCarResults', () => {
    it('should dispatch saveCarResults action', () => {
      const expectedAction = {
        carResults: 'carResults',
        type: 'CAR_BOOKING__SAVE_CAR_RESULTS'
      };

      expect(CarBookingActions.saveCarResults(expectedAction.carResults)).toEqual(expectedAction);
    });
  });

  describe('startNewSessionFlow', () => {
    it('should initialize carBooking flow status, trigger resetCarBookingFlowData action and initialize car data when startNewSessionFlow is called', (done) => {
      store.dispatch(CarBookingActions.startNewSessionFlow());

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).toEqual(expectedStartNewFlowActions);
      }, done);
    });
  });

  describe('prepareCarCrossSellAndTransitionToCarBooking', () => {
    it('should trigger actions to start new flow, save selected search and transition to car booking page when called', (done) => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/booking');
      BrowserObject.location = { pathname: '/car/booking' };
      store.dispatch(CarBookingActions.prepareCarCrossSellAndTransitionToCarBooking(searchRequest));

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).toEqual([
          ...expectedStartNewFlowActions,
          {
            searchRequest,
            type: 'CAR_BOOKING__SAVE_SELECTED_RECENT_SEARCH_REQUEST'
          },
          {
            payload: {
              args: [carBookingIndex],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      }, done);
    });

    it('should trigger actions to start new flow, save selected search and transition to car booking page from view-reservation', (done) => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('reservation');
      BrowserObject.location = { pathname: '/view-reservation/car/details' };
      store.dispatch(CarBookingActions.prepareCarCrossSellAndTransitionToCarBooking(searchRequest));

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).toEqual([
          ...expectedStartNewFlowActions,
          {
            searchRequest,
            type: 'CAR_BOOKING__SAVE_SELECTED_RECENT_SEARCH_REQUEST'
          },
          {
            payload: {
              args: [carBookingIndex],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      }, done);
    });

    it('should trigger actions to start new flow, save selected search and transition to car booking page from my-account', (done) => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('account');
      BrowserObject.location = { pathname: '/my-account/car/details' };
      store.dispatch(CarBookingActions.prepareCarCrossSellAndTransitionToCarBooking(searchRequest));

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).toEqual([
          ...expectedStartNewFlowActions,
          {
            searchRequest,
            type: 'CAR_BOOKING__SAVE_SELECTED_RECENT_SEARCH_REQUEST'
          },
          {
            payload: {
              args: [carBookingIndex],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      }, done);
    });
  });

  describe('prepareCarCrossSellFromQueryAndTransitionToCarBooking', () => {
    it('should trigger actions to start new flow, save selected search and transition to car booking page when called with query', (done) => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
      BrowserObject.location = { pathname: '/air/booking/confirmation' };

      const query = {
        'pickup-datetime': '2019-01-20T10:30',
        'pickup-location': 'DAL',
        'return-datetime': '2019-01-25T22:30',
        'return-location': 'HOU'
      };

      store.dispatch(CarBookingActions.prepareCarCrossSellFromQueryAndTransitionToCarBooking(query));

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).toEqual([
          ...expectedStartNewFlowActions,
          {
            searchRequest,
            type: 'CAR_BOOKING__SAVE_SELECTED_RECENT_SEARCH_REQUEST'
          },
          {
            payload: {
              args: [carBookingIndex],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      }, done);
    });

    it('should trigger actions to start new flow and transition to car booking page when called when query is undefined', (done) => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
      BrowserObject.location = { pathname: '/air/booking/confirmation' };
      const query = undefined;

      store.dispatch(CarBookingActions.prepareCarCrossSellFromQueryAndTransitionToCarBooking(query));

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).toEqual([
          ...expectedStartNewFlowActions,
          {
            payload: {
              args: [carBookingIndex],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      }, done);
    });

    it('should trigger actions to start new session, save selected search, and call exit webview if isWebView', (done) => {
      const query = {
        'pickup-datetime': '2019-01-20T10:30',
        'pickup-location': 'DAL',
        'return-datetime': '2019-01-25T22:30',
        'return-location': 'HOU'
      };

      store.dispatch(CarBookingActions.prepareCarCrossSellFromQueryAndTransitionToCarBooking(query, true));

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).toEqual([
          ...expectedStartNewFlowActions,
          {
            searchRequest,
            type: 'CAR_BOOKING__SAVE_SELECTED_RECENT_SEARCH_REQUEST'
          },
          {
            route: carBookingIndex,
            type: 'WEB_VIEW__SEND_EXIT'
          }
        ]);
      }, done);
    });
  });
});
