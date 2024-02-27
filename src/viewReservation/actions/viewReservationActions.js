// @flow
import i18n from '@swa-ui/locale';
import { goBack, push, replace } from 'connected-react-router';
import _ from 'lodash';
import { history } from 'src/appHistory';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import CarBookingLocalStorageHelper from 'src/carBooking/helpers/carBookingLocalStorageHelper';
import { resetSameDayFlowData, retrieveSameDayShoppingInformationMethod, shouldRedirectToHomePage } from 'src/sameDay/actions/sameDayActions';
import { resetAlternativeFormsOfPayment } from 'src/shared/actions/alternativeFormsOfPaymentActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import { customerMessageAnalytics, raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as ReservationApi from 'src/shared/api/reservationApi';
import * as SameDayApi from 'src/shared/api/sameDayApi';
import { STATUS } from 'src/shared/constants/flowConstants';
import { RECORD_LOCATOR } from 'src/shared/constants/requestParameter';
import { get } from 'src/shared/helpers/jsUtils';
import { buildLocation, buildPathWithParamAndQuery, buildPathWithParamAndUniqueQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { transformResponseToViewReservationDetail } from 'src/shared/transformers/reservationTransformer';
import { retrieveFlightReservationErrorHandler } from 'src/viewReservation/actions/actionErrorHelper/viewReservationActionErrorHandler';
import ViewReservationActionTypes, { apiActionCreator } from 'src/viewReservation/actions/viewReservationActionTypes';
import * as ReservationDetailsTransformer from 'src/viewReservation/transformers/reservationDetailsTransformer';
import * as WcmActions from 'src/wcm/actions/wcmActions';

import type { Dispatch as ReduxDispatch } from 'redux';
import type {
  CarRetrieveReservationRequestType,
  FlightRetrieveInfoRequestType,
  FlightRetrieveInfoWithSearchTokenRequestType,
  RetrieveReservationRequestType,
  SaveTravelInformationParamType
} from 'src/viewReservation/flow-typed/viewReservation.types';

import type { SameDayReservation, Dispatch as ThunkDispatch } from 'src/shared/flow-typed/shared.types';

const {
  VIEW_RESERVATION__CLEAR_FLIGHT_RESERVATION,
  VIEW_RESERVATION__FETCH_CAR_RESERVATION,
  VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
  VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO,
  VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION,
  VIEW_RESERVATION__SAVE_CAR_RESERVATION,
  VIEW_RESERVATION__SAVE_SEARCH_REQUEST,
  VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS,
  VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO,
  VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION
} = ViewReservationActionTypes;

export const saveCarReservation = (reservation: *) => ({
  type: VIEW_RESERVATION__SAVE_CAR_RESERVATION,
  reservation
});

const { fetchFlightReservation, fetchFlightReservationSuccess, fetchFlightReservationFailed } = apiActionCreator(
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION
);

const { fetchDayOfTravelContactInfo, fetchDayOfTravelContactInfoSuccess, fetchDayOfTravelContactInfoFailed } =
  apiActionCreator(VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO);

const { updateDayOfTravelContactInfo, updateDayOfTravelContactInfoSuccess, updateDayOfTravelContactInfoFailed } =
  apiActionCreator(VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO);

const { fetchCarReservation, fetchCarReservationSuccess, fetchCarReservationFailed } = apiActionCreator(
  VIEW_RESERVATION__FETCH_CAR_RESERVATION
);

const { fetchTravelInformation, fetchTravelInformationSuccess, fetchTravelInformationFailed } = apiActionCreator(
  VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION
);

const { updateTravelInformation, updateTravelInformationSuccess, updateTravelInformationFailed } = apiActionCreator(
  VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION
);
const { fetchSameDayBoundInfo, fetchSameDayBoundInfoSuccess, fetchSameDayBoundInfoFailed } = apiActionCreator(
  VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO, { shouldRedirectToHomePage }
);

export const saveTravelInformation =
  ({ updateTravelInformationLink, pnr, editNamesSuccessfulUpdateMessage, searchToken }: SaveTravelInformationParamType) =>
    (dispatch: *) => {
      dispatch(updateTravelInformation(updateTravelInformationLink));

      return ReservationApi.updateTravelInformation(updateTravelInformationLink)
        .then((response) => {
          const newName = pnr
            ? {
              firstName: pnr.firstName,
              middleName: pnr.middleName,
              lastName: pnr.lastName
            }
            : null;

          dispatch(updateTravelInformationSuccess({ response, newName }));
          dispatch(AnalyticsActions.specialAssistanceAnalytics(false));

          const hasEditedName = _.get(
            response,
            'editPNRPassengerUpdate._links.viewReservationViewPage.query.has-edited-name',
            false
          );
          const passengerSearchToken = _.get(
            response,
            'editPNRPassengerUpdate._links.viewReservationViewPage.query.passenger-search-token',
            null
          );
          const pushUrl = buildPathWithParamAndUniqueQuery(getNormalizedRoute({ routeName: 'viewReservationView' }), searchToken? {}: {
            recordLocator: pnr.recordLocator
          }, searchToken? { searchToken }: {});
          const pushState = {
            firstName: pnr.firstName,
            lastName: pnr.lastName,
            recordLocator: pnr.recordLocator,
            hasEditedName,
            passengerSearchToken
          };

          if (editNamesSuccessfulUpdateMessage) {
            dispatch(
              showDialog({
                active: true,
                name: 'edit-name-success-popup',
                message: editNamesSuccessfulUpdateMessage,
                buttons: [
                  {
                    label: i18n('SHARED__BUTTON_TEXT__OK'),
                    onClick: () => {
                      dispatch(hideDialog()).then(() => dispatch(push(pushUrl, pushState)));
                    }
                  }
                ]
              })
            );
          } else {
            dispatch(push(pushUrl, pushState));
          }
        })
        .catch((error) => {
          dispatch(updateTravelInformationFailed(error));
        });
    };

const saveSearchRequest = (searchRequest) => ({
  type: VIEW_RESERVATION__SAVE_SEARCH_REQUEST,
  searchRequest
});

export const retrieveFlightReservation = (retrieveReservationInfo: FlightRetrieveInfoRequestType | FlightRetrieveInfoWithSearchTokenRequestType, withSearchToken: boolean = false) => {
  const {
    companionInfo,
    dispatchPageLoadComplete,
    hasEditedName = false,
    isLoggedIn,
    passengerSearchToken = null,
    recordLocator = RECORD_LOCATOR,
    firstName,
    lastName
  } = (retrieveReservationInfo: any);

  return (dispatch: ReduxDispatch<*>) => {
    if (!withSearchToken && firstName && lastName) {
      dispatch(saveSearchRequest({ recordLocator, firstName, lastName })); 
    }

    dispatch(fetchFlightReservation());

    const reservationParams = withSearchToken
      ? { recordLocator, hasEditedName, passengerSearchToken }
      : { recordLocator, firstName, lastName, hasEditedName, passengerSearchToken };

    return ReservationApi.retrieveReservation(reservationParams, isLoggedIn)
      .then((viewReservationPageResponse) => _mergeCompanionInfo(companionInfo, viewReservationPageResponse))
      .then((viewReservationViewPage) => {
        dispatch(fetchFlightReservationSuccess(transformResponseToViewReservationDetail(viewReservationViewPage)));

        if (dispatchPageLoadComplete) {
          const { location, action } = dispatchPageLoadComplete;

          dispatch(AnalyticsActions.pageLoadCompletedForAnalytics(location, action));
        }
        customerMessageAnalytics(viewReservationViewPage.viewReservationViewPage.messages);
        raiseSatelliteEvent('BoardingPass Details');

        if (withSearchToken) {
          return viewReservationViewPage;
        }
      })
      .catch((error) => {
        error.errorHandler = retrieveFlightReservationErrorHandler;
        dispatch(fetchFlightReservationFailed(error));
      });
  };
};

export const retrieveDayOfTravelContactInformation =
  (retrieveContactInfoLink: Link) => (dispatch: ReduxDispatch<*>) => {
    dispatch(fetchDayOfTravelContactInfo());

    return ReservationApi.retrieveDayOfTravelContactInformation(retrieveContactInfoLink)
      .then((contactInformation) => dispatch(fetchDayOfTravelContactInfoSuccess(contactInformation)))
      .catch((error) => dispatch(fetchDayOfTravelContactInfoFailed(error)));
  };

export const updateDayOfTravelContactInformation = (request: Link, searchToken: string) => (dispatch: ReduxDispatch<*>) => {
  dispatch(updateDayOfTravelContactInfo());

  return ReservationApi.updateDayOfTravelContactInformation(request)
    .then(() => {
      dispatch(updateDayOfTravelContactInfoSuccess());
      
      if (!searchToken) {
        dispatch(goBack());
      }
    })
    .catch((error) => dispatch(updateDayOfTravelContactInfoFailed(error)));
};

export const updateDayOfTravelContactInformationAndTransitionToViewReservationDetailPage =
  (request: Link, searchToken: string) => (dispatch: *) =>
    dispatch(updateDayOfTravelContactInformation(request, searchToken)).then(() => {
      dispatch(replace(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'viewReservationView' }), {}, { searchToken })));
    });

export const retrieveCarReservation = (retrieveReservationRequest: RetrieveReservationRequestType | CarRetrieveReservationRequestType) => (dispatch: *) => {
  dispatch(fetchCarReservation());

  return Promise.all([
    ReservationApi.retrieveCarReservation(retrieveReservationRequest),
    dispatch(WcmActions.retrieveCarVendorImages()),
    dispatch(CarBookingActions.retrieveCarLocations())
  ])
    .then(([apiResponse, { car_vendors: carVendorImages }]) => {
      const carLocations = _.get(CarBookingLocalStorageHelper.getCarLocations(), 'locations', []);
      const transformedResponse = ReservationDetailsTransformer.transformRetrieveCarReservationApiResponse(
        apiResponse,
        carVendorImages,
        carLocations
      );

      dispatch(fetchCarReservationSuccess(transformedResponse));
    })
    .catch((error) => {
      dispatch(
        fetchCarReservationFailed({
          ...error,
          errorHandler: () => dispatch(replace(getNormalizedRoute({ routeName: 'carReservationIndex' })))
        })
      );
    });
};

export const retrieveCarReservationAndTransitionToCarDetailPage =
  (retrieveReservationRequest: RetrieveReservationRequestType) => (dispatch: *) =>
    dispatch(retrieveCarReservation(retrieveReservationRequest)).then(() => {
      dispatch(push(getNormalizedRoute({ routeName: 'carReservationDetails' })));
    });

export const retrieveCarReservationWithSearchToken =
  (searchToken: string) => (dispatch: *) =>
    dispatch(retrieveCarReservation({ searchToken }));

export const updateTravelInformationForAnalytics = (editPNRPassengerLink: ?Link) => ({
  type: VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS,
  saveTravelInformationRequest: editPNRPassengerLink
});

export const retrieveTravelInformation = (editPNRPassengerLink: Link, recordLocator: string, searchToken: string, shouldPushRoute: boolean = false) => (dispatch: *) => {
  dispatch(fetchTravelInformation({ editPNRPassengerLink }));

  return ReservationApi.retrieveTravelInformation(editPNRPassengerLink)
    .then((response) => {
      dispatch(fetchTravelInformationSuccess(response));
      dispatch(AnalyticsActions.specialAssistanceAnalytics(false));

      if (shouldPushRoute) {
        const firstName = get(editPNRPassengerLink, 'query.first-name');
        const lastName = get(editPNRPassengerLink, 'query.last-name');
        const passengerReference = get(editPNRPassengerLink, 'query.passenger-reference');
        const travelInformationPageURL = buildPathWithParamAndUniqueQuery(getNormalizedRoute({ routeName: 'travelerInformation' }), {
          passengerReference: passengerReference
        }, 
        {
          passengerReference: passengerReference,
          searchToken: searchToken
        });
        const pnr = { firstName, lastName, recordLocator };

        dispatch(push(buildLocation(travelInformationPageURL, null, null, pnr)));
      }
    })
    .catch((error) => dispatch(fetchTravelInformationFailed(error)));
};

export const clearFlightReservation = () => ({
  type: VIEW_RESERVATION__CLEAR_FLIGHT_RESERVATION
});

const _mergeCompanionInfo = (accountInfo, viewReservationPageResponse) => {
  const companionConfirmationNumber = _.get(
    viewReservationPageResponse,
    'viewReservationViewPage.companion.confirmationNumber'
  );
  const companionFullName = _.get(accountInfo, 'companionFullName');
  const companionName = _.get(accountInfo, 'companionName');

  const shouldMergeCompanionInfo = !_.isEmpty(companionConfirmationNumber) && !_.isEmpty(companionFullName);

  if (shouldMergeCompanionInfo) {
    return _.merge({}, viewReservationPageResponse, {
      viewReservationViewPage: {
        companion: {
          name: companionFullName,
          firstName: _.get(companionName, 'firstName'),
          lastName: _.get(companionName, 'lastName'),
          confirmationNumber: companionConfirmationNumber
        }
      }
    });
  }

  return _.merge({}, viewReservationPageResponse, {
    viewReservationViewPage: {
      companion: null
    }
  });
};

export const retrieveSameDayBoundInformation = (sameDayUpdate: SameDayReservation, replace: boolean = false) => (dispatch: ThunkDispatch) => {
  const passengerSearchToken = sameDayUpdate.body?.passengerSearchToken;

  dispatch(resetAlternativeFormsOfPayment());
  dispatch(fetchSameDayBoundInfo());
  dispatch(resetSameDayFlowData());
  dispatch(FlowStatusActions.setFlowStatus('sameDay', STATUS.INITIAL));

  return SameDayApi.retrieveSameDayBoundInformation(sameDayUpdate)
    .then(({ viewForSameDayPage }) => {
      if (viewForSameDayPage?._meta?.showBoundSelection) {
        dispatch(FlowStatusActions.setFlowStatus('sameDay', STATUS.IN_PROGRESS));
        history.push('/same-day/bound-selection');
      } else {
        const selectedBoundIndex = (viewForSameDayPage?.boundSelections && viewForSameDayPage.boundSelections.findIndex(boundSelection => boundSelection.isSelectable));

        dispatch(retrieveSameDayShoppingInformationMethod(viewForSameDayPage, selectedBoundIndex, replace));
      }

      dispatch(fetchSameDayBoundInfoSuccess({ ...viewForSameDayPage, passengerSearchToken }));
    })
    .catch((error) => dispatch(fetchSameDayBoundInfoFailed(error)));
};

export const retrieveFlightAndTravelInformationWithSearchToken = (searchToken: string, passengerReference: string) => (dispatch: ThunkDispatch) => {
  dispatch(retrieveFlightReservation({ passengerSearchToken: searchToken }, true))
    .then(viewReservationViewPage => {
      const _links = viewReservationViewPage?.viewReservationViewPage?._links;
      const editPNRPassengerLink = _.find(_links.editPNRPassengers, (editPNRPassenger) => 
        get(editPNRPassenger, 'query.passenger-reference') === passengerReference
      );

      return editPNRPassengerLink && dispatch(retrieveTravelInformation(editPNRPassengerLink, "", searchToken, false));
    });
};

export const retrieveDayOfTravelContactInformationWithSearchToken = (searchToken: string) => (dispatch: ThunkDispatch) => {
  dispatch(retrieveFlightReservation({ passengerSearchToken: searchToken }, true))
    .then(viewReservationViewPage => {
      const contactInformationLinks = viewReservationViewPage?.viewReservationViewPage?._links.contactInformation;

      return contactInformationLinks && dispatch(retrieveDayOfTravelContactInformation(contactInformationLinks));
    });
};
