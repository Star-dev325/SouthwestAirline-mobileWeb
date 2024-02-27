// @flow
import { push } from 'connected-react-router';
import type { Dispatch as ReduxDispatch } from 'redux';
import CarBookingActionTypes, { apiActionCreator } from 'src/carBooking/actions/carBookingActionTypes';
import { carBookingOldRoutes, carBookingRoutes } from 'src/carBooking/constants/carBookingRoutes';
import CarBookingLocalStorageHelper from 'src/carBooking/helpers/carBookingLocalStorageHelper';
import {
  transformToContactInfo, transformToDriverInfo
} from 'src/carBooking/transformers/carBookingPurchaseTransformer';
import { transformToCarReservation } from 'src/carBooking/transformers/carReservationTransformer';
import { transformFromQueryToSearchRequest } from 'src/carBooking/transformers/flightInfoTransformer';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as CarBookingApi from 'src/shared/api/carBookingApi';
import { STATUS } from 'src/shared/constants/flowConstants';
import SharedConstants from 'src/shared/constants/sharedConstants';
import { ROUTES } from 'src/shared/constants/webViewConstants';
import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import { get, isEmpty } from 'src/shared/helpers/jsUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { getCurrentAppFlow } from 'src/shared/selectors/appSelector';
import { retrieveCarVendorImages } from 'src/wcm/actions/wcmActions';

import type {
  CarBookingContactInfoType, CarReservationType,
  CarResultVehicleType, DriverInfoType,
  FindCarsRequestType,
  GetCarBookingLinkQueryType,
  GroupedCarResultMapType, PartialSearchRequestType, SearchRequestType
} from 'src/carBooking/flow-typed/carBooking.types';
import type { Dispatch as ThunkDispatch } from 'src/shared/flow-typed/shared.types';

const { CAR_BOOKING } = ROUTES;

const {
  CAR_BOOKING__BOOK_CAR,
  CAR_BOOKING__FETCH_CAR_LOCATIONS,
  CAR_BOOKING__FETCH_CAR_PRICING,
  CAR_BOOKING__FETCH_CAR_VENDORS,
  CAR_BOOKING__FETCH_CARS,
  CAR_BOOKING__FETCH_USER_ACCOUNT_INFO,
  CAR_BOOKING__FETCH_VENDOR_TERMS_AND_CONDITIONS,
  CAR_BOOKING__RESET_FLOW_DATA,
  CAR_BOOKING__SAVE_CAR_RESERVATION,
  CAR_BOOKING__SAVE_CAR_RESULTS,
  CAR_BOOKING__SAVE_FETCH_CARS_REQUEST,
  CAR_BOOKING__SAVE_SELECTED_CAR,
  CAR_BOOKING__SAVE_SELECTED_EXTRAS
} = CarBookingActionTypes;

const { fetchCarLocations, fetchCarLocationsSuccess, fetchCarLocationsFailed } = apiActionCreator(
  CAR_BOOKING__FETCH_CAR_LOCATIONS
);

const {
  APP_FLOWS: { MY_ACCOUNT, VIEW_RESERVATION }
} = SharedConstants;

export const startNewSessionFlow = () => (dispatch: *) => {
  dispatch(FlowStatusActions.setFlowStatus('carBooking', STATUS.INITIAL));
  dispatch(resetCarBookingFlowData());

  dispatch(retrieveCarVendorImages(false));
  dispatch(retrieveCarVendors());
  dispatch(retrieveCarLocations());
  dispatch(getRecentSearchesFromLocalStorage());
};

const resetCarBookingFlowData = () => ({
  type: CAR_BOOKING__RESET_FLOW_DATA
});

export const retrieveCarLocations = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(fetchCarLocations());

  const carLocations = CarBookingLocalStorageHelper.getCarLocations();

  if (!isEmpty(carLocations)) {
    dispatch(fetchCarLocationsSuccess(carLocations));
  } else {
    return CarBookingApi.retrieveLocations()
      .then((response) => {
        dispatch(fetchCarLocationsSuccess(response));
        CarBookingLocalStorageHelper.saveCarLocations(response);
      })
      .catch((error) => dispatch(fetchCarLocationsFailed(error)));
  }
};

const { fetchCarVendors, fetchCarVendorsSuccess, fetchCarVendorsFailed } =
  apiActionCreator(CAR_BOOKING__FETCH_CAR_VENDORS);

export const retrieveCarVendors = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(fetchCarVendors());

  const carVendors = CarBookingLocalStorageHelper.getCarVendors();

  if (!isEmpty(carVendors)) {
    dispatch(fetchCarVendorsSuccess(carVendors));
  } else {
    return CarBookingApi.retrieveCarVendors()
      .then((response) => {
        dispatch(fetchCarVendorsSuccess(response));
        CarBookingLocalStorageHelper.saveCarVendors(response);
      })
      .catch((error) => dispatch(fetchCarVendorsFailed(error)));
  }
};

const { fetchCars, fetchCarsSuccess, fetchCarsFailed } = apiActionCreator(CAR_BOOKING__FETCH_CARS);

export const findCars =
  (request: FindCarsRequestType, isDeepLink: boolean = false) =>
    (dispatch: *, getState: () => *): Promise<*> => {
      const state = getState();

      dispatch(fetchCars());

      return CarBookingApi.shopping(request)
        .then((response) => {
          dispatch(saveFindCarSearchRequest(request));
          dispatch(saveRecentSearchRequestToLocalStorage(request));
          dispatch(FlowStatusActions.setFlowStatus('carBooking', STATUS.IN_PROGRESS));
          dispatch(fetchCarsSuccess(response));

          const ENABLE_URL_NORMALIZATION = state?.app?.toggles?.ENABLE_URL_NORMALIZATION;
          const carBookingSelectRoute = ENABLE_URL_NORMALIZATION ? carBookingRoutes['select'] : carBookingOldRoutes['select'];

          !isDeepLink && dispatch(push(carBookingSelectRoute));
        })
        .catch((error) => dispatch(fetchCarsFailed(error)));
    };

export const saveFindCarSearchRequest = (request: FindCarsRequestType) => ({
  type: CAR_BOOKING__SAVE_FETCH_CARS_REQUEST,
  request
});

export const saveCarResults = (carResults: GroupedCarResultMapType) => ({
  type: CAR_BOOKING__SAVE_CAR_RESULTS,
  carResults
});

const saveSelectedCar = (selectedCar: CarResultVehicleType) => ({
  type: CAR_BOOKING__SAVE_SELECTED_CAR,
  selectedCar
});

export const saveCarReservation = (carReservation: CarReservationType) => ({
  type: CAR_BOOKING__SAVE_CAR_RESERVATION,
  carReservation
});

export const saveSelectedExtras = (selectedExtras: Array<string>) => ({
  type: CAR_BOOKING__SAVE_SELECTED_EXTRAS,
  selectedExtras
});

const { fetchCarPricing, fetchCarPricingSuccess, fetchCarPricingFailed } =
  apiActionCreator(CAR_BOOKING__FETCH_CAR_PRICING);

export const retrieveCarPricing =
  (carResult: CarResultVehicleType, searchRequest: FindCarsRequestType) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      const queryParameters = isEmpty(carResult.appliedDiscount)
        ? null
        : {
          discount: [
            {
              type: get(carResult, 'appliedDiscount.type'),
              code: get(carResult, 'appliedDiscount.code')
            }
          ]
        };

      dispatch(fetchCarPricing(carResult));

      return CarBookingApi.retrieveCarPricing(carResult.productId, queryParameters)
        .then((response) => {
          const carReservation = transformToCarReservation(response, carResult, searchRequest);

          dispatch(saveCarReservation(carReservation));
          dispatch(saveSelectedCar(carResult));
          dispatch(saveSelectedExtras([]));
          dispatch(fetchCarPricingSuccess(response));
          dispatch(push(getNormalizedRoute({ routeName: 'price' })));
        })
        .catch((error) => dispatch(fetchCarPricingFailed(error)));
    };

const { bookCar, bookCarSuccess, bookCarFailed } = apiActionCreator(CAR_BOOKING__BOOK_CAR);

export const reserveCar =
  (request: *, isLoggedIn: boolean) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(bookCar(request));

      return CarBookingApi.reserveCar(request, isLoggedIn)
        .then((apiResponse) => {
          const response = {
            confirmationNumber: get(apiResponse, 'confirmationNumber'),
            purposeOfTravel: get(request, 'purposeOfTravel', ''),
            confirmationEmail: get(request, 'receiptEmail', ''),
            driver: {
              firstName: get(request, 'driver.firstName'),
              lastName: get(request, 'driver.lastName')
            }
          };

          dispatch(bookCarSuccess(response));
          dispatch(FlowStatusActions.setFlowStatus('carBooking', STATUS.COMPLETED));
          dispatch(push(getNormalizedRoute({ routeName: 'confirmation' })));
          playHapticFeedback();
        })
        .catch((error) => dispatch(bookCarFailed(error)));
    };

const { fetchVendorTermsAndConditions, fetchVendorTermsAndConditionsSuccess, fetchVendorTermsAndConditionsFailed } =
  apiActionCreator(CAR_BOOKING__FETCH_VENDOR_TERMS_AND_CONDITIONS);

export const retrieveVendorTermsAndConditions =
  (productId: string) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchVendorTermsAndConditions());

      return CarBookingApi.retrieveCarPricing(productId)
        .then((response) => {
          dispatch(fetchVendorTermsAndConditionsSuccess(response));
        })
        .catch((error) => dispatch(fetchVendorTermsAndConditionsFailed(error)));
    };

export const saveUserAccountDriverInfo = (driverInfo: DriverInfoType) => ({
  type: CarBookingActionTypes.CAR_BOOKING__SAVE_USER_ACCOUNT_DRIVER_INFO,
  driverInfo
});

export const saveUserAccountContactInfo = (contactInfo: CarBookingContactInfoType) => ({
  type: CarBookingActionTypes.CAR_BOOKING__SAVE_USER_ACCOUNT_CONTACT_INFO,
  contactInfo
});

const { fetchUserAccountInfo, fetchUserAccountInfoSuccess, fetchUserAccountInfoFailed } = apiActionCreator(
  CAR_BOOKING__FETCH_USER_ACCOUNT_INFO
);

export const loadUserAccountInfo =
  (pushUrl: string) =>
    (dispatch: ThunkDispatch): Promise<*> => {
      dispatch(fetchUserAccountInfo());

      return AccountsApi.fetchAccountInfo()
        .then((accountInfo) => {
          dispatch(saveUserAccountInfo(accountInfo));
          dispatch(fetchUserAccountInfoSuccess());
          dispatch(push(pushUrl));
        })
        .catch((error) => dispatch(fetchUserAccountInfoFailed(error)));
    };

export const saveUserAccountInfo = (accountInfo: *) => (dispatch: ReduxDispatch<*>) => {
  const driverInfo = transformToDriverInfo(accountInfo);
  const contactInfo = transformToContactInfo(accountInfo);

  dispatch(saveUserAccountDriverInfo(driverInfo));
  dispatch(saveUserAccountContactInfo(contactInfo));
};

export const saveSelectedRecentSearchRequest = (searchRequest: PartialSearchRequestType) => ({
  type: CarBookingActionTypes.CAR_BOOKING__SAVE_SELECTED_RECENT_SEARCH_REQUEST,
  searchRequest
});

export const prepareCarCrossSellAndTransitionToCarBooking = (searchRequest: SearchRequestType) => (dispatch: *) => {
  const currentAppFlow = getCurrentAppFlow();

  const routeName = (currentAppFlow === MY_ACCOUNT || currentAppFlow === VIEW_RESERVATION)
    ? 'carBookingIndex'
    : 'index';
  
  dispatch(prepareCarCrossSell(searchRequest));
  dispatch(push(getNormalizedRoute({ routeName })));
};

const prepareCarCrossSell = (searchRequest: SearchRequestType) => (dispatch: *) => {
  dispatch(startNewSessionFlow());
  dispatch(saveSelectedRecentSearchRequest(searchRequest));
};

export const prepareCarCrossSellFromQueryAndTransitionToCarBooking =
  (carBookingLinkQuery: GetCarBookingLinkQueryType, isWebView: boolean = false) =>
    (dispatch: *) => {
      if (carBookingLinkQuery) {
        const searchRequest = transformFromQueryToSearchRequest(carBookingLinkQuery);

        dispatch(prepareCarCrossSell(searchRequest));
      } else {
        dispatch(startNewSessionFlow());
      }

      isWebView ? dispatch(WebViewActions.exitWebView(CAR_BOOKING)) : dispatch(push(getNormalizedRoute({ routeName: 'carBookingIndex' })));
    };

export const saveRecentSearchRequests = (searchRequests: Array<SearchRequestType>) => ({
  type: CarBookingActionTypes.CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS,
  searchRequests
});

const saveRecentSearchRequestToLocalStorage = (findCarRequest: FindCarsRequestType) => {
  CarBookingLocalStorageHelper.saveCarRecentSearch(findCarRequest);

  return (dispatch: *) => {
    dispatch(getRecentSearchesFromLocalStorage());
  };
};

export const getRecentSearchesFromLocalStorage = () => {
  const searches = CarBookingLocalStorageHelper.loadCarRecentSearches();

  return (dispatch: *) => {
    dispatch(saveRecentSearchRequests(searches));
  };
};

export const deleteRecentSearchRequestFromLocalStorage = (
  searchRequests: Array<SearchRequestType>,
  indexToDelete: number
) => {
  CarBookingLocalStorageHelper.deleteCarRecentSearch(searchRequests, indexToDelete);

  return (dispatch: ReduxDispatch<*>) => {
    dispatch(saveRecentSearchRequests(CarBookingLocalStorageHelper.loadCarRecentSearches()));
  };
};
