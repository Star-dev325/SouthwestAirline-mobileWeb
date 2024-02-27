// @flow
import i18n from '@swa-ui/locale';
import { goBack, push, replace } from 'connected-react-router';
import dayjs from 'dayjs';
import _ from 'lodash';
import Q from 'q';
import React from 'react';
import type { Dispatch as ReduxDispatch } from 'redux';
import AirBookingActionTypes, { apiActionCreator } from 'src/airBooking/actions/airBookingActionTypes';
import { CHASE, TRAVEL_FUNDS } from 'src/airBooking/constants/airBookingConstants';
import { compareSearchFlightRequest } from 'src/airBooking/helpers/compareSearchFlightRequest';
import { isInformationCompletedForExpressCheckout } from 'src/airBooking/helpers/expressCheckoutHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { calculateLfcSelectedDates } from 'src/airBooking/helpers/lowFareHelper';
import * as PaymentPageSelectors from 'src/airBooking/selectors/paymentPageSelectors';
import { transformToFlightPricingPageRequest } from 'src/airBooking/transformers/flightProductTransformer';
import { transformToNextBoundPage, transformToPrevBoundPage } from 'src/airBooking/transformers/lfcTransformer';
import { transformToSelectedProducts } from 'src/airBooking/transformers/selectedProductsTransformer';
import {
  clearUnavailableMultiSelectGroup,
  saveMultiSelectGroup,
  updateUnavailableMultiSelectGroup
} from 'src/airports/actions/airportsActions';
import { getMultiSelectOriginDestinationShortDisplayName } from 'src/airports/helpers/airportsHelpers';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import { RR_VISA_PAYMENT_INFO } from 'src/chase/constants/chaseConstants';
import { showEarlybirdFailedDialog } from 'src/earlyBird/actions/earlyBirdActions';
import { removeSelectedCompany } from 'src/shared/actions/accountActions';
import { getMboxConfig, getSegments, getTargetParams } from 'src/shared/actions/adobeTargetActions';
import {
  alternativeFormsOfPaymentFailed,
  confirmAlternativeFormOfPayment,
  initiateVoidTransaction,
  resetAlternativeFormsOfPayment,
  sendAlternativeFormOfPaymentError
} from 'src/shared/actions/alternativeFormsOfPaymentActions';
import { updateSavedContactMethod } from 'src/shared/actions/contactMethodActions';
import { resetSavedCreditCards } from 'src/shared/actions/creditCardActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import { specialAssistanceAnalytics, traceYoungTravelerPage } from 'src/shared/analytics/actions/analyticsActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as ContentDeliveryApi from 'src/shared/api/contentDeliveryApi';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';
import { APPLE_PAY, UPLIFT } from 'src/shared/constants/creditCardTypes';
import {
  ERROR_CID_NOT_AVAILABLE,
  ERROR_GHOST_CARD_EXPIRED,
  ERROR_GHOST_CARD_REQUIRED,
  ERROR_HAWAII_MESSAGE,
  ERROR_INTERNAL_REFERENCE_NUMBER_REQUIRED,
  ERROR_NO_ROUTES_EXISTS,
  ERROR_PROMO_TOKEN_CHANGED_FROM_SHOPPING_TO_PURCHASE,
  ERROR_PROMO_TOKEN_EXPIRED_ON_PURCHASE,
  ERROR_TRAVELER_NOT_ASSOCIATED_GHOST_CARD_ORIGIN,
  ERROR_TRAVELER_NOT_ASSOCIATED_IRN_ORIGIN,
  ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_EXPIRED,
  ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_INVALID
} from 'src/shared/constants/errorCodes';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import { STATUS } from 'src/shared/constants/flowConstants';
import {
  AIR_BOOKING_PARENT_OR_GUARDIAN_FORM,
  AIRBOOKING_PURCHASE_SUMMARY_FORM,
  AIR_BOOKING_SHOPPING_SEARCH_FORM
} from 'src/shared/constants/formIds';
import { CHANNEL } from 'src/shared/constants/requestParameter';
import { getDefaultSelectedPaymentInfo } from 'src/shared/helpers/creditCardHelper';
import { dispatchHideDialog } from 'src/shared/helpers/dialogHelper';
import { containsApiErrorCodes, isSessionTimeoutError } from 'src/shared/helpers/errorCodesHelper';
import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import { isFunction } from 'src/shared/helpers/jsUtils';
import { hasCorporateToken } from 'src/shared/helpers/loginSessionHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { getAudienceWcmAppContext, getChaseWcmAppContext } from 'src/shared/selectors/chaseSelector';
import { shouldShowEarlyBirdInPathForAirbooking } from 'src/shared/selectors/earlyBirdSelector';
import { isSWAVacationEligible } from 'src/shared/selectors/swaVacationSelector';
import { toChapiAfpErrorLog } from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import { generateDialogConfigFromError } from 'src/shared/transformers/dialogTransformer';
import {
  transformToAPIRequest,
  transformToNoRoutesErrorDialogOptions
} from 'src/shared/transformers/flightProductSearchRequestTransformer';
import { transformToPurchaseRequest } from 'src/shared/transformers/flightPurchaseRequestTransformer';
import { transformToMultiSelectGroupRequest } from 'src/shared/transformers/multiSelectGroupRequestTransformer';
import { getPlacements } from 'src/wcm/actions/wcmActions';
import {
  AIR_BOOKING_INDEX_PAGE_ID,
  CASH_POINTS_INDEX_PAGE_ID,
  CONFIRMATION_PAGE_ID,
  PERSONA_TYPE_CORPORATE,
  PERSONA_TYPE_LEISURE,
  PRICING_PAGE_ID,
  PURCHASE_PAGE_ID,
  SELECT_INBOUND_FARE_PAGE_ID,
  SELECT_INBOUND_PAGE_ID,
  SELECT_OUTBOUND_FARE_PAGE_ID,
  SELECT_OUTBOUND_PAGE_ID
} from 'src/wcm/constants/wcmConstants';
import store2 from 'store2';

import type {
  ApiErrorType,
  AirportType,
  BillingAddressFormType,
  ContactMethodInfo,
  Dispatch as ThunkDispatch,
  DutyOfCare,
  MultiSelectGroup,
  Passenger,
  PassengerInfos,
  PaymentInfo,
  PaymentSavedCreditCards,
  SelectedFrequentTravelerType
} from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type {
  CorporateBookingSwitchInfo,
  EarlyBirdEligibility,
  FlightProductSearchRequest,
  GeneratePurchaseSummaryPageParamsType,
  MultiSelectAirportBounds,
  PassengerCountValue,
  PassengerDetailsPageResponse,
  PassengerInfoRequest,
  PurchaseFlightParamsType,
  SearchForMultiSelectGroupFlightsArgsType,
  SelectedFlight,
  SelectedProducts,
  SelectFlightProduct
} from 'src/airBooking/flow-typed/airBooking.types';
import type { LowFareBoundType } from 'src/airBooking/flow-typed/lowFare.types';

const { SHOPPING_SEARCH_HISTORY_STORE_KEY, PAYPAL_DATA_KEY } = StorageKeys;
const {
  PURCHASE_PAGE_MBOX_ID,
  PRICING_CHASE_MBOX_ID,
  EARLY_BIRD_PURCHASE_VISIBILITY_MBOX_ID,
  EARLY_BIRD_PRICE_VISIBILITY_MBOX_ID,
  PRICE_PROMO_MIDDLE1_MBOX_ID,
  PURCHASE_PAYMENT_METHOD_MBOX_ID,
  CONFIRMATION_PLACEMENT_MBOX_ID
} = AdobeTargetConstants;

export const getMultiSelectGroupAirportsValue = (allAirports: AirportType[], airportList?: string[]) => {
  const airportData = airportList?.length
    ? allAirports.find(
      (airport) =>
        airport.multiSelectGroup &&
          airportList &&
          airportList.every((airportCode) => airport.multiSelectGroup.includes(airportCode))
    )
    : null;

  return airportData ? airportData.airportGroups.join(',') : null;
};

export const updateFlightSearchRequestAndSyncToFormData =
  (searchRequest: FlightProductSearchRequest, isDateChanged: boolean = true, shouldSaveSearchRequest: boolean = true) =>
    (dispatch: ReduxDispatch<*>, getState: () => *) => {
      const state = _.cloneDeep(getState());
      const allAirports = state?.app?.airports?.allAirports;
      const {
        departureDate,
        destination,
        numberOfAdults,
        numberOfLapInfants = 0,
        multipleOriginationAirports,
        multipleDestinationAirports,
        origin,
        returnDate,
        ...rest
      } = searchRequest;

      const destinationAirportsValue = getMultiSelectGroupAirportsValue(allAirports, multipleDestinationAirports);
      const originAirportsValue = getMultiSelectGroupAirportsValue(allAirports, multipleOriginationAirports);

      !isDateChanged && dispatch(replace(getNormalizedRoute({ routeName: 'indexWithoutClearForm' })));
      shouldSaveSearchRequest && dispatch(saveSearchRequest(searchRequest));
      dispatch(
        FormDataActions.updateFormDataValue(AIR_BOOKING_SHOPPING_SEARCH_FORM, {
          departureAndReturnDate: {
            departureDate,
            isDateChanged,
            returnDate
          },
          destination: destinationAirportsValue || destination,
          numberOfAdults,
          origin: originAirportsValue || origin,
          ...(multipleOriginationAirports ? { multipleOriginationAirports } : {}),
          ...(multipleDestinationAirports ? { multipleDestinationAirports } : {}),
          ...rest
        })
      );
      dispatch(
        savePassengerCount({
          lapChildCount: numberOfLapInfants,
          adultCount: numberOfAdults,
          valueUpdated: true
        })
      );
    };

export const resetFlightSearchRequest = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__RESET_FLIGHT_SEARCH_REQUEST
});

export const selectFare = (selectedFlight: SelectedFlight) => (dispatch: ReduxDispatch<*>) => {
  const { direction } = _.get(selectedFlight, 'flightDetails.params');

  const routeName = direction === OUTBOUND ? 'selectDepartFare' : 'selectReturnFare';

  dispatch(saveSelectedFlight(selectedFlight));
  dispatch(
    push(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName }), {
        paxType: 'adult',
        direction
      })
    )
  );

  if (selectedFlight.isMultiSelectGroup) {
    direction === 'outbound'
      ? raiseSatelliteEvent('otter', { page: 'air-booking-select-multi-outbound-fare' })
      : raiseSatelliteEvent('otter', { page: 'air-booking-select-multi-inbound-fare' });
  } else {
    direction === 'outbound' ? raiseSatelliteEvent('select fare page') : raiseSatelliteEvent('select mobile fare page');
  }
};

export const saveTravelFundsBillingAddress = (travelFundsAddress: BillingAddressFormType) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SAVE_TRAVEL_FUNDS_ADDRESS,
  travelFundsAddress
});

export const saveSearchRequest = (searchRequest: FlightProductSearchRequest) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
  searchRequest
});

export const getInitialSearch = (isInitialSearch: boolean) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH,
  isInitialSearch
});

export const savePaymentInfo = (paymentInfo: *) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO,
  paymentInfo
});

const resetPaymentInfo = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__RESET_PAYMENT_INFO
});

export const savePaymentInfoAndGoToPurchaseSummaryPage = (paymentInfo: PaymentInfo) => (dispatch: ReduxDispatch<*>) => {
  dispatch(savePaymentInfo(paymentInfo));
  dispatch(push(getNormalizedRoute({ routeName: 'purchase' })));
};

export const savePaymentInfoAndBackToPreviousPage = (paymentInfo: PaymentInfo) => (dispatch: ReduxDispatch<*>) => {
  dispatch(savePaymentInfo(paymentInfo));
  dispatch(goBack());
  dispatch(FormDataActions.updateFormFieldDataValue(AIRBOOKING_PURCHASE_SUMMARY_FORM, 'securityCode', ''));
};

export const setCalendarStrip = (isCalendarStrip: boolean) => ({
  type: AirBookingActionTypes.AIR_BOOKING__CALENDAR_STRIP,
  isCalendarStrip
});

const fetchLocalRecentSearch = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__FETCH_RECENT_SEARCH_PAGE
});

const savePassenger = ({ passengerInfo, index }: { passengerInfo: Passenger, index: number }) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER,
  passengerInfo,
  index
});

const updatePassenger = ({ passengerInfo, index }: { passengerInfo: Passenger, index: number }) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_PASSENGER,
  passengerInfo,
  index
});

const updateSpecialAssistance = ({
  specialAssistanceFormData,
  index
}: {
  specialAssistanceFormData: FormData,
  index: number
}) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_SPECIAL_ASSISTANCE,
  specialAssistanceFormData,
  index
});

const clearSpecialAssistance = ({ index }: { index: number }) => ({
  type: AirBookingActionTypes.AIR_BOOKING__CLEAR_SPECIAL_ASSISTANCE,
  index
});

const resetPassenger = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__RESET_PASSENGER
});

const fetchLocalRecentSearchSuccess = (searches: Array<*>) => ({
  type: AirBookingActionTypes.AIR_BOOKING__FETCH_RECENT_SEARCH_PAGE_SUCCESS,
  searches
});

export const getRecentSearchForLocalStorage = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(fetchLocalRecentSearch());

  const localStorageRequests = store2.get(SHOPPING_SEARCH_HISTORY_STORE_KEY) || [];

  dispatch(fetchLocalRecentSearchSuccess(localStorageRequests));
};

const saveSearchRequestToLocalStorage = (searchRequest: FlightProductSearchRequest) => {
  const localStorageRequests = store2.get(SHOPPING_SEARCH_HISTORY_STORE_KEY) || [];

  _.remove(localStorageRequests, (request) => {
    const today = dayjs();
    const isExpired = dayjs(request.departureDate).isBefore(today, 'day');

    return isExpired || compareSearchFlightRequest(request, searchRequest);
  });

  const searchRequestWithoutPromoCode = _.omit(searchRequest, 'promoCode');

  localStorageRequests.unshift(searchRequestWithoutPromoCode);

  const maxShoppingSearchesToSave = 20;

  if (localStorageRequests.length > maxShoppingSearchesToSave) {
    localStorageRequests.pop();
  }

  store2.set(SHOPPING_SEARCH_HISTORY_STORE_KEY, localStorageRequests);
};

export const {
  fetchIndexPagePlacements,
  fetchIndexPagePlacementsSuccess,
  fetchIndexPagePlacementsFailed
} = apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS);

export const getAirBookingIndexPagePlacements = () => (dispatch: ThunkDispatch, getState: () => *) => {
  const state = _.cloneDeep(getState());

  dispatch(fetchIndexPagePlacements());

  return dispatch(getTargetParams({}, AIR_BOOKING_INDEX_PAGE_ID))
    .then((params) => dispatch(getMboxConfig(AIR_BOOKING_INDEX_PAGE_ID, params, [])))
    .then((config) => dispatch(getSegments(config)))
    .then((segments) => dispatch(getPlacements(AIR_BOOKING_INDEX_PAGE_ID, [], segments, {}, true)))
    .then((content) => dispatch(fetchSplitPayPagePlacementsSuccess(content)))
    .catch(() => dispatch(fetchSplitPayPagePlacementsFailed()));
};

export const { fetchFlightShoppingPage, fetchFlightShoppingPageSuccess, fetchFlightShoppingPageFailed } =
  apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE);

const {
  fetchFlightShoppingMultiSelectPage,
  fetchFlightShoppingMultiSelectPageSuccess,
  fetchFlightShoppingMultiSelectPageFailed
} = apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE);

export const searchForFlights =
  ({
    errorHandler,
    multiSelectGroup,
    nextPagePath,
    preventFlowStatusChange,
    searchRequest,
    shouldSaveSearchRequest = true,
    shouldUpdateMultiSelectBound = false
  }: {
    errorHandler?: () => void,
    multiSelectGroup?: MultiSelectGroup,
    nextPagePath?: string,
    preventFlowStatusChange?: boolean,
    searchRequest: FlightProductSearchRequest,
    shouldSaveSearchRequest?: boolean,
    shouldUpdateMultiSelectBound?: boolean
  }) =>
    (dispatch: *) => {
      !preventFlowStatusChange && dispatch(FlowStatusActions.setFlowStatus('airBooking', STATUS.INITIAL));
      dispatch(fetchFlightShoppingPage(searchRequest));
      dispatch(resetSelectedProducts());

      if (preventFlowStatusChange) {
        dispatch(updateFlightSearchRequestAndSyncToFormData(searchRequest, true, shouldSaveSearchRequest));
      } else {
        shouldSaveSearchRequest && dispatch(saveSearchRequest(searchRequest));
        dispatch(
          savePassengerCount({
            lapChildCount: searchRequest?.numberOfLapInfants || 0,
            adultCount: searchRequest.numberOfAdults || 1,
            valueUpdated: true
          })
        );
      }

      return FlightBookingApi.findFlightProducts(transformToAPIRequest(searchRequest))
        .then((response) => {
          store2.session.remove(PAYPAL_DATA_KEY);
          dispatch(resetAlternativeFormsOfPayment());
          !preventFlowStatusChange && dispatch(FlowStatusActions.setFlowStatus('airBooking', STATUS.IN_PROGRESS));
          shouldUpdateMultiSelectBound &&
          searchRequest.origin &&
          searchRequest.destination &&
          dispatch(
            updateMultiSelectBound({
              originBoundAirport: searchRequest.origin,
              destinationBoundAirport: searchRequest.destination
            })
          );
          dispatch(fetchFlightShoppingPageSuccess(response));
          dispatch(getInitialSearch(true));
          !shouldUpdateMultiSelectBound && shouldSaveSearchRequest && saveSearchRequestToLocalStorage(searchRequest);

          if (nextPagePath) {
            dispatch(push(nextPagePath));
          }
        })
        .catch((originalError) => {
          const isHawaiiNoRoutesError = containsApiErrorCodes(originalError, ERROR_HAWAII_MESSAGE);
          const isNonHawaiiNoRoutesError = containsApiErrorCodes(originalError, ERROR_NO_ROUTES_EXISTS);

          const isCustomized = isHawaiiNoRoutesError || isNonHawaiiNoRoutesError;
          const error = isCustomized ? _.merge(originalError, { $customized: true }) : originalError;
          const nonHawaiiNoRoutesErrorMessages = {
            title: i18n('ERROR__NO_ROUTES_EXISTS_HEADER'),
            message: i18n('ERROR__NO_ROUTES_EXISTS')
          };

          if (_.isFunction(errorHandler)) error.errorHandler = errorHandler;
          dispatch(fetchFlightShoppingPageFailed(error));

          const noRoutesSearchRequest = {
            origin: _.get(searchRequest, 'from'),
            destination: _.get(searchRequest, 'to'),
            departureDate: _.get(searchRequest, 'departureDate')
          };

          isHawaiiNoRoutesError &&
          _handleHawaiiNoRoutesError(originalError, dispatch, noRoutesSearchRequest, errorHandler);
          isNonHawaiiNoRoutesError &&
          dispatch(
            showDialog(
              transformToNoRoutesErrorDialogOptions(
                originalError,
                noRoutesSearchRequest,
                nonHawaiiNoRoutesErrorMessages,
                _.noop,
                errorHandler
              )
            )
          );

          shouldUpdateMultiSelectBound && dispatch(clearMultiSelectBound());
          multiSelectGroup &&
          multiSelectGroup.isSelected &&
          searchRequest.origin &&
          searchRequest.destination &&
          dispatch(
            updateUnavailableMultiSelectGroup({ origin: searchRequest.origin, destination: searchRequest.destination })
          );
        });
    };

const _handleHawaiiNoRoutesError = (error, dispatch, searchRequest, errorHandler) => {
  const query = { pageId: 'hawaii-no-routes-popup', channel: CHANNEL };

  ContentDeliveryApi.getContent(query)
    .then((response) => {
      const { buttons, errorTitle, errorDescription } = _.get(response, 'results.noRouteExistsHawaii.content');
      const transformButtonToLinks = (buttonList) => {
        const filteredButtons = _.reject(buttonList, ['buttonText', 'OK']);

        const transformedLinks = _.map(filteredButtons, (button) => ({
          label: button.buttonText,
          href: button.target,
          onClick: () => dispatchHideDialog().then(errorHandler),
          isExternal: button.linkType === 'webview'
        }));

        return transformedLinks;
      };

      const links = transformButtonToLinks(buttons);

      dispatch(
        showDialog({
          active: true,
          title: errorTitle,
          name: 'no-routes-hawaii-error',
          message: errorDescription,
          closeLabel: i18n('SHARED__BUTTON_TEXT__OK'),
          closeLabelStyle: PRIMARY,
          error,
          onClose: () => dispatchHideDialog().then(errorHandler),
          verticalLinks: {
            links
          }
        })
      );
    })
    .catch(() => {
      dispatch(showDialog(transformToNoRoutesErrorDialogOptions(error, searchRequest, _.noop, errorHandler)));
    });
};

export const resetMultiSelectBoundSelection = () => (dispatch: *) => {
  dispatch(resetFlightShoppingResponse());
  dispatch(clearMultiSelectBound());
};

export const searchForMultiSelectGroupFlights =
  ({
    errorHandler,
    multiSelectGroup,
    nextPagePath,
    searchRequest,
    shouldSaveSearchRequest = true
  }: SearchForMultiSelectGroupFlightsArgsType) =>
    (dispatch: *, getState: () => *) => {
      const state = getState();

      const allAirports = state?.app?.airports?.allAirports;
      const multiSelectOriginDestinationObject = getMultiSelectOriginDestinationShortDisplayName(
        allAirports,
        multiSelectGroup
      );
      const modifiedSearchRequest = { ...searchRequest, ...multiSelectOriginDestinationObject };

      dispatch(fetchFlightShoppingMultiSelectPage(modifiedSearchRequest));
      dispatch(resetSelectedProducts());
      dispatch(resetMultiSelectBoundSelection());
      shouldSaveSearchRequest && dispatch(saveSearchRequest(modifiedSearchRequest));
      dispatch(
        savePassengerCount({
          lapChildCount: modifiedSearchRequest?.numberOfLapInfants || 0,
          adultCount: modifiedSearchRequest.numberOfAdults || 1,
          valueUpdated: true
        })
      );
      dispatch(saveMultiSelectGroup(multiSelectGroup));
      dispatch(clearUnavailableMultiSelectGroup());

      return FlightBookingApi.findMultiSelectGroup(transformToMultiSelectGroupRequest(modifiedSearchRequest))
        .then(({ multipleAirportsData }) => {
          dispatch(FlowStatusActions.setFlowStatus('airBooking', STATUS.IN_PROGRESS));
          dispatch(fetchFlightShoppingMultiSelectPageSuccess(multipleAirportsData));
          !shouldSaveSearchRequest && dispatch(saveSearchRequest(modifiedSearchRequest));
          saveSearchRequestToLocalStorage(modifiedSearchRequest);

          if (nextPagePath) {
            dispatch(push(nextPagePath));
          }
        })
        .catch((originalError) => {
          if (isFunction(errorHandler)) originalError.errorHandler = errorHandler;
          dispatch(FlowStatusActions.setFlowStatus('airBooking', STATUS.IN_PROGRESS));
          dispatch(fetchFlightShoppingMultiSelectPageFailed(originalError));
        });
    };

export const getProductList =
  ({ searchRequest }: { searchRequest: FlightProductSearchRequest }) =>
    (dispatch: *) => {
      dispatch(fetchFlightShoppingPage(searchRequest));

      return FlightBookingApi.findFlightProducts(transformToAPIRequest(searchRequest))
        .then((response) => {
          dispatch(updateFlightSearchRequestAndSyncToFormData(searchRequest));
          dispatch(fetchFlightShoppingPageSuccess(response));
          dispatch(getInitialSearch(false));
          saveSearchRequestToLocalStorage(searchRequest);

          if (_.get(searchRequest, 'useLowFareCalendar', false)) {
            const { departureDate, returnDate, isRoundTrip } = searchRequest;

            !!departureDate && dispatch(selectLowFareCalendarOutboundDate(departureDate));

            if (isRoundTrip && returnDate) {
              dispatch(selectLowFareCalendarInboundDate(returnDate));
            }
          }
        })
        .catch((error) => dispatch(fetchFlightShoppingPageFailed(error)));
    };

export const generatePurchaseSummaryPage = ({
  flightPricingPageResponse,
  passengerInfos
}: GeneratePurchaseSummaryPageParamsType) => ({
  type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PURCHASE_SUMMARY_PAGE,
  flightPricingPageResponse,
  passengerInfos
});

export const regeneratePurchaseSummaryPage = () => (dispatch: ReduxDispatch<*>, getState: () => *) => {
  const state = _.cloneDeep(getState());

  const flightPricingPageResponse = _.get(state, 'app.airBooking.flightPricingPage.response');
  const passengerInfos = _.get(state, 'app.airBooking.passengerInfos');

  dispatch(generatePurchaseSummaryPage({ flightPricingPageResponse, passengerInfos }));
};

export const sortFlightProducts = (sortBy: string, direction: string, paxType: string) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY,
  direction,
  sortBy,
  paxType
});

export const updateCorporateBookingSwitchInfo = (corporateBookingSwitchInfo: ?CorporateBookingSwitchInfo) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CORPORATE_BOOKING_SWITCH_INFO,
  corporateBookingSwitchInfo
});

export const updateSelectedIrn = (name: string, manuallyEntered: boolean = false) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_SELECTED_IRN,
  selectedIrn: { name, manuallyEntered }
});

export const saveEarlyBirdSelected = (earlyBirdSelected: boolean = false) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED,
  earlyBirdSelected
});

export const generatePassengerPageInfo = ({ searchRequest, chaseCardHolder }: PassengerInfoRequest) => ({
  type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PASSENGER_PAGE_INFO,
  searchRequest,
  chaseCardHolder
});

export const gotoFirstPassengerPage =
  ({ searchRequest, path, chaseCardHolder }: PassengerInfoRequest) =>
    (dispatch: ReduxDispatch<*>) => {
      dispatch(specialAssistanceAnalytics(false));
      dispatch(generatePassengerPageInfo({ searchRequest, chaseCardHolder }));
      dispatch(push(path));
    };

export const resetAirBookingPurchaseData = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(resetPassenger());
  dispatch(resetPaymentInfo());
  dispatch(resetSavedCreditCards());
  dispatch(resetContactMethod());
  dispatch(setExpressCheckoutEligible(true));
  dispatch(FormDataActions.resetFormData());
  dispatch(cleanUpFrequentTravelerSelected());
  dispatch(cleanUpAirBookingAccountInfo());
};

const cleanUpAirBookingAccountInfo = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__CLEAR_ACCOUNT_INFO
});

const getPersona = () => (hasCorporateToken() ? PERSONA_TYPE_CORPORATE : PERSONA_TYPE_LEISURE);

const saveSelectedFlight = (selectedFlight: SelectedFlight) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SAVE_SELECTED_FLIGHT,
  selectedFlight
});

const saveSelectedProducts = (selectedProducts: SelectedProducts) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SAVE_SELECTED_PRODUCTS,
  selectedProducts
});

const resetSelectedProducts = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__RESET_SELECTED_PRODUCTS
});

const { fetchFlightPricingPage, fetchFlightPricingPageSuccess, fetchFlightPricingPageFailed } = apiActionCreator(
  AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE
);

export const selectFlightProduct = (params: SelectFlightProduct) => (dispatch: ThunkDispatch, getState: () => *) => {
  const {
    direction,
    paxType,
    fareProductId,
    nextProductPagePath,
    flightPricingPage,
    searchRequest,
    flightCardIndex,
    tier
  } = params;
  const selectedProducts = transformToSelectedProducts({
    selectedProducts: params.selectedProducts,
    paxType,
    direction,
    fareProductId,
    flightCardIndex
  });

  dispatch(saveSelectedProducts(selectedProducts));

  if (nextProductPagePath) {
    return Q(dispatch(push(nextProductPagePath)));
  } else {
    dispatch(fetchFlightPricingPage());

    return loadChaseSessionId(dispatch).then((chaseSessionId) => {
      const flightPricingPageLink = _.merge({}, flightPricingPage, {
        body: {
          chaseSessionId,
          ...(tier ? { tier } : {})
        }
      });

      return FlightBookingApi.getProductPrices(
        transformToFlightPricingPageRequest(selectedProducts, flightPricingPageLink, searchRequest)
      )
        .then((response) => {
          const EARLY_BIRD_AB_TESTING = _.get(getState(), 'app.toggles.EARLY_BIRD_AB_TESTING', false);

          EARLY_BIRD_AB_TESTING &&
            dispatch(setEarlyBirdPricingToken(_.get(response, 'flightPricingPage.earlyBirdPricingToken', null)));
          dispatch(setExpressCheckoutEligible(true));
          dispatch(handleProductPricing(response, true));
        })
        .catch((error) => dispatch(_handleErrorWithRedirect(fetchFlightPricingPageFailed, error)));
    });
  }
};

export const selectFlightProductWithUpsell = (linkObj: Link) => (dispatch: ThunkDispatch) => {
  dispatch(fetchFlightPricingPage(true));

  return FlightBookingApi.getProductPrices(linkObj)
    .then((response) => {
      dispatch(handleProductPricing(response));
    })
    .catch((error) => {
      dispatch(setHasUpsellError(true));
      dispatch(_handleErrorWithRedirect(fetchFlightPricingPageFailed, error));
    });
};

const handleProductPricing = (response, shouldNavigateToPricingPage) => (dispatch: ThunkDispatch) => {
  dispatch(setEarlyBirdEligibility(_.get(response, 'flightPricingPage.earlyBirdEligibility', null)));
  dispatch(fetchFlightPricingPageSuccess(response));
  dispatch(setInternationalBookingFlag(response));

  const shouldShowRepriceNotification = !!_.get(response, 'flightPricingPage._meta.showRepriceNotification');

  if (shouldShowRepriceNotification) {
    dispatch(push(getNormalizedRoute({ routeName: 'reprice' })));
  } else if (shouldNavigateToPricingPage) {
    dispatch(push(getNormalizedRoute({ routeName: 'price' })));
  }
};

const _handleErrorWithRedirect =
  (errorHandlerFn: (*) => *, error: ApiErrorType) => (dispatch: ThunkDispatch, getState: () => *) => {
    const isWebView = _.get(getState(), 'app.webView.isWebView', false);
    const redirectErrorCodes = [
      ERROR_GHOST_CARD_REQUIRED,
      ERROR_GHOST_CARD_EXPIRED,
      ERROR_INTERNAL_REFERENCE_NUMBER_REQUIRED,
      ERROR_TRAVELER_NOT_ASSOCIATED_IRN_ORIGIN,
      ERROR_PROMO_TOKEN_EXPIRED_ON_PURCHASE,
      ERROR_PROMO_TOKEN_CHANGED_FROM_SHOPPING_TO_PURCHASE,
      ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_EXPIRED,
      ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_INVALID,
      ERROR_TRAVELER_NOT_ASSOCIATED_GHOST_CARD_ORIGIN,
      ERROR_CID_NOT_AVAILABLE
    ];

    if (containsApiErrorCodes(error, redirectErrorCodes)) {
      dispatch(
        errorHandlerFn({
          ...error,
          errorHandler: () => _errorHandlerCallback(dispatch, isWebView)
        })
      );
    } else {
      dispatch(errorHandlerFn(error));
    }
  };

const saveChaseSessionId = (chaseSessionId) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SAVE_CHASE_SESSION_ID,
  chaseSessionId
});

export const loadChaseSessionId = (dispatch: *) =>
  LocalStorageCache.loadChaseSessionId()
    .then((chaseSessionId) => {
      dispatch(saveChaseSessionId(chaseSessionId));

      return chaseSessionId;
    })
    .catch(_.noop);

export const saveChaseCardPaymentInfo = () => (dispatch: ReduxDispatch<*>, getState: () => *) => {
  const state = _.cloneDeep(getState());

  if (PaymentPageSelectors.shouldShowChaseInstantCreditCard(state)) {
    dispatch(savePaymentInfo(RR_VISA_PAYMENT_INFO));
  }
};

export const transitionToShoppingLandingPage = (searchRequest: FlightProductSearchRequest) => (dispatch: *) => {
  dispatch(updateFlightSearchRequestAndSyncToFormData(searchRequest));
  dispatch(push(getNormalizedRoute({ routeName: 'indexWithoutClearForm' })));
};

export const transitionToSelectCompanyPage = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(push(getNormalizedRoute({ routeName: 'selectCompanyToggle' })));
  raiseSatelliteEvent('choose company');
};

export const transitionToFrequentTravelerPage = (paxNumber: number, formId: string) => (dispatch: ReduxDispatch<*>) => {
  dispatch(
    push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'frequentTravelers' }), { paxNumber }, { formId }))
  );
  dispatch(loadFrequentTravelerPage());
  raiseSatelliteEvent('otter', { page_name: 'frequent traveler' });
};

export const selectedFrequentTravelerAnalytics = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(selectedFrequentTraveler());
};

const selectedFrequentTraveler = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__SELECTED_FREQUENT_TRAVELER
});

const loadFrequentTravelerPage = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__LOAD_FREQUENT_TRAVELER_PAGE
});

export const deleteCurrentSearchRequest = (indexOfSearchToBeDeleted: number) => {
  const localStorageRequests = store2.get(SHOPPING_SEARCH_HISTORY_STORE_KEY) || [];
  const searches = _.filter(
    localStorageRequests,
    (searchRequest: FlightProductSearchRequest, index: number) => index !== indexOfSearchToBeDeleted
  );

  store2.set(SHOPPING_SEARCH_HISTORY_STORE_KEY, searches);

  return {
    type: AirBookingActionTypes.AIR_BOOKING__DELETE_CURRENT_SEARCH_REQUEST,
    searches
  };
};

export const resetAirBookingFlowData = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA
});

export const setInternationalBookingFlag = (response: *) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SET_INTERNATIONAL_BOOKING_FLAG,
  response
});

export const savePassengerPassport = (paxNumber: number, passportAndEmergencyContact: *) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_PASSPORT,
  passportAndEmergencyContact,
  paxNumber
});

export const resetPassengerPassport = (paxNumber: number) => ({
  type: AirBookingActionTypes.AIR_BOOKING__RESET_PASSENGER_PASSPORT,
  paxNumber
});

const fetchSavedCCAndPassengerInfo = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO,
  isFetching: true
});

const fetchSavedCCAndPassengerInfoSuccess = (
  paymentSavedCreditCardsPage: PaymentSavedCreditCards,
  passengerDetailsPageResponse: PassengerDetailsPageResponse
) => ({
  type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
  paymentSavedCreditCardsPage,
  passengerDetailsPageResponse,
  isFetching: false
});

const fetchSavedCreditCardsAndPassengerInfoFail = (error) => ({
  type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED,
  isFetching: false,
  error
});

const { fetchPurchasePagePlacements, fetchPurchasePagePlacementsSuccess, fetchPurchasePagePlacementsFailed } =
  apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS);

export const loadPurchasePagePlacements = () => (dispatch: ThunkDispatch, getState: () => *) => {
  const state = _.cloneDeep(getState());
  const EARLY_BIRD_AB_TESTING = _.get(state, 'app.toggles.EARLY_BIRD_AB_TESTING', false);
  const USE_UPLIFT_INSTALLMENT_PAYMENTS_MBOX = _.get(state, 'app.toggles.USE_UPLIFT_INSTALLMENT_PAYMENTS_MBOX', false);
  const appContexts = shouldShowEarlyBirdInPathForAirbooking(state) ? ['earlyBirdEligible'] : [];
  const defaultMboxes = [
    PURCHASE_PAGE_MBOX_ID,
    ...(EARLY_BIRD_AB_TESTING ? [EARLY_BIRD_PURCHASE_VISIBILITY_MBOX_ID] : []),
    ...(USE_UPLIFT_INSTALLMENT_PAYMENTS_MBOX ? [PURCHASE_PAYMENT_METHOD_MBOX_ID] : [])
  ];

  dispatch(fetchPurchasePagePlacements());

  return dispatch(getTargetParams({}, PURCHASE_PAGE_ID))
    .then((params) => dispatch(getMboxConfig(PURCHASE_PAGE_ID, params, defaultMboxes)))
    .then((config) => dispatch(getSegments(config)))
    .then((segments) =>
      dispatch(
        getPlacements(
          PURCHASE_PAGE_ID,
          [...appContexts, getChaseWcmAppContext(state)],
          segments,
          {
            persona: getPersona()
          },
          true
        )
      )
    )
    .then((content) => dispatch(fetchPurchasePagePlacementsSuccess(content)))
    .catch(() => dispatch(fetchPurchasePagePlacementsFailed()));
};

const { fetchSplitPayPagePlacements, fetchSplitPayPagePlacementsSuccess, fetchSplitPayPagePlacementsFailed } =
  apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS);

export const loadSplitPayPagePlacements = () => (dispatch: ThunkDispatch, getState: () => *) => {
  const state = _.cloneDeep(getState());

  dispatch(fetchSplitPayPagePlacements());

  return dispatch(getTargetParams({}, CASH_POINTS_INDEX_PAGE_ID))
    .then((params) => dispatch(getMboxConfig(CASH_POINTS_INDEX_PAGE_ID, params, [])))
    .then((config) => dispatch(getSegments(config)))
    .then((segments) => dispatch(getPlacements(CASH_POINTS_INDEX_PAGE_ID, [getAudienceWcmAppContext(state)], segments)))
    .then((content) => dispatch(fetchSplitPayPagePlacementsSuccess(content)))
    .catch(() => dispatch(fetchSplitPayPagePlacementsFailed()));
};

const { fetchSplitPayOptionsList, fetchSplitPayOptionsListFailed, fetchSplitPayOptionsListSuccess } = apiActionCreator(
  AirBookingActionTypes.AIR_BOOKING__FETCH_SPLIT_PAY_OPTIONS_LIST
);

export const getSplitPayOptionsList =
  (splitPayOptionsRequestObject: Link) =>
    (dispatch: *): Promise<*> => {
      dispatch(fetchSplitPayOptionsList());

      return FlightBookingApi.fetchSplitPayOptionsList(splitPayOptionsRequestObject)
        .then((response) => {
          dispatch(fetchSplitPayOptionsListSuccess(response));
          dispatch(saveSplitPayTermsAndConditions(response?.splitPayPage?.termsAndConditions));
          raiseSatelliteEvent('apply rapid rewards');
          dispatch(push(getNormalizedRoute({ routeName: 'applyRapidRewards' })));
        })
        .catch((error) => {
          const responseCode = _.get(error, 'responseJSON.code');
          const errorRequestId = _.get(error, 'responseJSON.requestId');

          dispatch(
            showDialog({
              name: 'split-pay-options-failure',
              title: i18n('SPLIT_PAY_OPTIONS__FAILURE'),
              contentView: (
                <div>
                  <br />
                  <p>Error {responseCode}</p>
                  <p>({errorRequestId})</p>
                </div>
              ),
              buttons: [
                {
                  label: i18n('SHARED__BUTTON_TEXT__OK'),
                  onClick: () => dispatch(hideDialog())
                }
              ]
            })
          );
          error.$customized = true;
          dispatch(fetchSplitPayOptionsListFailed(error));
        });
    };

export const saveSplitPayTermsAndConditions = (termsAndConditions: string) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SAVE_SPLIT_PAY_TERMS_AND_CONDITIONS,
  termsAndConditions
});

export const resetSplitPayTermsAndConditions = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__RESET_SPLIT_PAY_TERMS_AND_CONDITIONS
});

export const resumeSplitPayAfterLogin = (shouldResume: boolean) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SPLIT_PAY_RESUME_AFTER_LOGIN,
  shouldResume
});

const {
  fetchConfirmationPagePlacements,
  fetchConfirmationPagePlacementsSuccess,
  fetchConfirmationPagePlacementsFailed
} = apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS);

export const getConfirmationPagePlacements =
  () =>
    (dispatch: ThunkDispatch): Promise<*> => {
      const defaultMboxes = [CONFIRMATION_PLACEMENT_MBOX_ID];

      dispatch(fetchConfirmationPagePlacements());

      return dispatch(getTargetParams({}, CONFIRMATION_PAGE_ID))
        .then((params) => dispatch(getMboxConfig(CONFIRMATION_PAGE_ID, params, defaultMboxes)))
        .then((config) => dispatch(getSegments(config)))
        .then((segments) => dispatch(getPlacements(CONFIRMATION_PAGE_ID, [], segments, { persona: getPersona() }, true)))
        .then((content) => dispatch(fetchConfirmationPagePlacementsSuccess(content)))
        .catch(() => dispatch(fetchConfirmationPagePlacementsFailed()));
    };

const {
  fetchFlightSelectPagePlacements,
  fetchFlightSelectPagePlacementsSuccess,
  fetchFlightSelectPagePlacementsFailed
} = apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS);

export const getFlightSelectPagePlacements =
  (direction: ?string) =>
    (dispatch: ThunkDispatch): Promise<*> => {
      const pageId = direction === INBOUND ? SELECT_INBOUND_PAGE_ID : SELECT_OUTBOUND_PAGE_ID;

      dispatch(fetchFlightSelectPagePlacements());

      return dispatch(getTargetParams({}, pageId))
        .then((params) => dispatch(getMboxConfig(pageId, params, [])))
        .then((config) => dispatch(getSegments(config)))
        .then((segments) => dispatch(getPlacements(pageId, [], segments, { persona: getPersona() }, true)))
        .then((content) => dispatch(fetchFlightSelectPagePlacementsSuccess(content)))
        .catch(() => dispatch(fetchFlightSelectPagePlacementsFailed()));
    };

const {
  fetchFlightSelectFarePagePlacements,
  fetchFlightSelectFarePagePlacementsSuccess,
  fetchFlightSelectFarePagePlacementsFailed
} = apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS);

export const getFlightSelectFarePagePlacements =
  (direction: ?string) =>
    (dispatch: ThunkDispatch): Promise<*> => {
      const pageId = direction === INBOUND ? SELECT_INBOUND_FARE_PAGE_ID : SELECT_OUTBOUND_FARE_PAGE_ID;

      dispatch(fetchFlightSelectFarePagePlacements());

      return dispatch(getTargetParams({}, pageId))
        .then((params) => dispatch(getMboxConfig(pageId, params, [])))
        .then((config) => dispatch(getSegments(config)))
        .then((segments) => dispatch(getPlacements(pageId, [], segments, { persona: getPersona() }, true)))
        .then((content) => dispatch(fetchFlightSelectFarePagePlacementsSuccess(content)))
        .catch(() => dispatch(fetchFlightSelectFarePagePlacementsFailed()));
    };

export const cleanUpFrequentTravelerSelected = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__CLEAR_SELECTED_FREQUENT_TRAVELERS
});

export const setIsSplitPayVisible = (isSplitPayVisible: string) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SET_IS_SPLIT_PAY_VISIBLE,
  isSplitPayVisible: isSplitPayVisible === 'show'
});

export const setIsUpliftVisible = (isUpliftVisible: string) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SET_IS_UPLIFT_VISIBLE,
  isUpliftVisible: isUpliftVisible === 'true'
});

export const fetchSavedCCsAndPassengerInfoWithExpressCheckOut =
  (
    isInternationalBooking: boolean,
    passengerPageUrl: string,
    passengerNumber: ?number,
    isExpressCheckoutFromPassengerPage: boolean,
    shouldShowChaseInstantCreditCard: boolean
  ) =>
    (dispatch: *) => {
      dispatch(fetchSavedCCAndPassengerInfo());

      return Promise.all([AccountsApi.fetchPaymentOptions(), FlightBookingApi.fetchPassengerInfo()])
        .then((responses) => {
          const [{ paymentSavedCreditCardsPage }, { passengerDetailsPage }] = responses;
          const ghostCards = _.get(paymentSavedCreditCardsPage, 'ghostCards');
          const paymentInfo = ghostCards && getDefaultSelectedPaymentInfo(paymentSavedCreditCardsPage);
          const dutyOfCareContact = responses[1].passengerDetailsPage?.dutyOfCareContact;

          dispatch(fetchSavedCCAndPassengerInfoSuccess(paymentSavedCreditCardsPage, responses[1]));
          dispatch(prefillPassengerInfo(passengerDetailsPage, isInternationalBooking));
          ghostCards && !!_.get(paymentInfo, 'selectedCardId') && dispatch(savePaymentInfo(paymentInfo));

          if (dutyOfCareContact) {
            dispatch(updateContactTravelInfoMethod(dutyOfCareContact));
            dispatch(FormDataActions.resetFormData());
          }

          dispatch(FormDataActions.clearFormDataByURL(passengerPageUrl));
          dispatch(
            expressCheckout(
              paymentSavedCreditCardsPage,
              passengerDetailsPage,
              passengerNumber,
              isExpressCheckoutFromPassengerPage,
              shouldShowChaseInstantCreditCard
            )
          );
        })
        .catch((error) => {
          dispatch(setExpressCheckoutEligible(false));
          dispatch(_handleErrorWithRedirect(fetchSavedCreditCardsAndPassengerInfoFail, error));
        });
    };

export const fetchSavedCreditCardsAndPassengerInfo =
  (isInternationalBooking: boolean, passengerPageUrl?: string) => (dispatch: *) => {
    dispatch(fetchSavedCCAndPassengerInfo());

    return Promise.all([AccountsApi.fetchPaymentOptions(), FlightBookingApi.fetchPassengerInfo()])
      .then((responses) => {
        const [{ paymentSavedCreditCardsPage }, { passengerDetailsPage }] = responses;
        const paymentInfo = getDefaultSelectedPaymentInfo(paymentSavedCreditCardsPage);

        dispatch(fetchSavedCCAndPassengerInfoSuccess(paymentSavedCreditCardsPage, responses[1]));
        dispatch(prefillPassengerInfo(passengerDetailsPage, isInternationalBooking));
        passengerPageUrl && dispatch(FormDataActions.clearFormDataByURL(passengerPageUrl));
        !!_.get(paymentInfo, 'selectedCardId') && dispatch(savePaymentInfo(paymentInfo));
      })
      .catch((error) => {
        dispatch(resetPaymentInfo());
        dispatch(_handleErrorWithRedirect(fetchSavedCreditCardsAndPassengerInfoFail, error));
      });
  };

const _errorHandlerCallback = (dispatch: ThunkDispatch, isWebView: boolean) => {
  if (isWebView) {
    dispatch(WebViewActions.exitWebView());
  } else {
    dispatch(removeSelectedCompany());
    dispatch(push(getNormalizedRoute({ routeName: 'index' })));
  }
};

export const setIsExpressCheckout = (isExpressCheckout: boolean) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SET_IS_EXPRESS_CHECKOUT,
  isExpressCheckout
});

export const expressCheckout =
  (
    savedCreditCards: ?PaymentSavedCreditCards,
    passengerDetailsPage: Passenger,
    passengerNumber: ?number,
    isExpressCheckoutFromPassengerPage: boolean,
    shouldShowChaseInstantCreditCard: boolean
  ) =>
    (dispatch: ReduxDispatch<*>) => {
      if (
        !shouldShowChaseInstantCreditCard &&
      passengerNumber === 1 &&
      isInformationCompletedForExpressCheckout(passengerDetailsPage)
      ) {
        const paymentInfo = getDefaultSelectedPaymentInfo(savedCreditCards);

        paymentInfo.selectedCardId && dispatch(savePaymentInfo(paymentInfo));

        const hasGhostCard =
        _.get(savedCreditCards, 'ghostCardRequired') || _.get(savedCreditCards, 'ghostCards.length') === 1;

        dispatch(setIsExpressCheckout(!hasGhostCard));

        if (isExpressCheckoutFromPassengerPage) {
          dispatch(push(getNormalizedRoute({ routeName: 'purchase' })));
        } else {
          dispatch(replace(getNormalizedRoute({ routeName: 'purchase' })));
        }
      }
      dispatch(setExpressCheckoutEligible(false));
    };

const { fetchBookingConfirmationPage, fetchBookingConfirmationPageSuccess, fetchBookingConfirmationPageFailed } =
  apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE);

export const purchaseFlight =
  (purchaseFlightParams: PurchaseFlightParamsType, isLoggedIn: boolean, isWebViewExpressCheckout: boolean) =>
    (dispatch: *, getState: *) => {
      const purchaseRequest = transformToPurchaseRequest(purchaseFlightParams, isWebViewExpressCheckout);
      const state = _.cloneDeep(getState());
      const isWebView = _.get(state, 'app.webView.isWebView', false);
      const isUplift = _.get(purchaseRequest, 'body.payment.newCreditCard.digitalPaymentType') === UPLIFT.key;
      const CEPTOR_VOID_API = state?.app?.toggles?.CEPTOR_VOID_API;

      dispatch(WebViewActions.enableNavigationControls(false));
      dispatch(fetchBookingConfirmationPage());
      store2.session.remove(PAYPAL_DATA_KEY);

      return FlightBookingApi.purchaseFlight(purchaseRequest, isLoggedIn, isWebViewExpressCheckout)
        .then((response) => {
          dispatch(FlowStatusActions.setFlowStatus('airBooking', STATUS.COMPLETED));

          if (!_.isEmpty(_.get(purchaseRequest, 'body.payment.chaseInstantCreditCard'))) {
            dispatch(ChaseActions.resetChaseData());
          }

          const internalReferenceNumber = _.get(response, 'flightConfirmationPage.internalReferenceNumber');

          if (internalReferenceNumber) {
            dispatch(updateSelectedIrn(internalReferenceNumber));
          }

          dispatch(fetchBookingConfirmationPageSuccess(response));
          dispatch(push(getNormalizedRoute({ routeName: 'confirmation' })));
          playHapticFeedback();

          const { contactMethodInfo } = purchaseFlightParams;

          dispatch(updateSavedContactMethod(contactMethodInfo));
          const { failedEarlyBird } = response.flightConfirmationPage;

          if (failedEarlyBird) {
            dispatch(showEarlybirdFailedDialog(failedEarlyBird));
          }

          if (isUplift) {
            const recordLocator = _.get(response, 'flightConfirmationPage.pnrs[0].recordLocator');

            recordLocator && dispatch(confirmAlternativeFormOfPayment(recordLocator));
          }

          dispatch(WebViewActions.enableNavigationControls(true));
        })
        .catch((error) => {
          const errorCode = _.get(error, 'code');
          const responseJsonErrorCode = _.get(error, 'responseJSON.code');
          const responseJsonErrorMessage = _.get(error, 'responseJSON.message');
          const errorRequestId = _.get(error, 'requestId');
          const isApplePay = _.get(purchaseRequest, 'body.payment.newCreditCard.digitalPaymentType') === APPLE_PAY.key;

          dispatch(WebViewActions.enableNavigationControls(true));
          dispatch(FormDataActions.updateFormFieldDataValue(purchaseFlightParams.formId, 'securityCode', ''));

          if (errorCode === CHASE.PAYMENT_FAILURE_ERROR_CODE) {
            dispatch(
              showDialog({
                name: 'chase-payment-failure',
                title: i18n('AIR_BOOKING__CHASE_PAYMENT_FAILURE__TITLE'),
                className: 'check-our-work-dialog',
                message: i18n('AIR_BOOKING__CHASE_PAYMENT_FAILURE__MESSAGE'),
                contentView: (
                  <div>
                    <br />
                    <p>Error {errorCode}</p>
                    <p>({errorRequestId})</p>
                  </div>
                ),
                buttons: [
                  {
                    label: i18n('SHARED__BUTTON_TEXT__OK'),
                    onClick: () => dispatch(hideDialog())
                  }
                ]
              })
            );
            error.$customized = true;
            dispatch(fetchBookingConfirmationPageFailed(error));
          } else if (responseJsonErrorCode === TRAVEL_FUNDS.TOKEN_EXPIRED_AIRBOOKING_CODE) {
            const dialogConfig = generateDialogConfigFromError(error);

            dispatch(
              showDialog({
                name: 'fund-token-expired-message',
                buttons: [
                  {
                    label: i18n('SHARED__BUTTON_TEXT__OK'),
                    onClick: () => {
                      dispatch(hideDialog()).then(() => {
                        !isWebView && dispatch(push(getNormalizedRoute({ routeName: 'index' })));
                        isWebView && dispatch(WebViewActions.exitWebView());
                      });
                    }
                  }
                ],
                ...dialogConfig
              })
            );
            dispatch(fetchBookingConfirmationPageFailed());
          } else if (isApplePay) {
            sendErrorLog(toChapiAfpErrorLog(error, PAYMENT_METHODS.APPLE_PAY));

            if (!CEPTOR_VOID_API || !isSessionTimeoutError(error)) {
              dispatch(initiateVoidTransaction(PAYMENT_METHODS.APPLE_PAY, error));
            }
            dispatch(fetchBookingConfirmationPageFailed());
          } else if (isUplift) {
            responseJsonErrorMessage && dispatch(sendAlternativeFormOfPaymentError(responseJsonErrorMessage));
            sendErrorLog(toChapiAfpErrorLog(error, PAYMENT_METHODS.UPLIFT));
            dispatch(fetchBookingConfirmationPageFailed(error));
            dispatch(alternativeFormsOfPaymentFailed());
          } else {
            dispatch(_handleErrorWithRedirect(fetchBookingConfirmationPageFailed, error));
          }
        });
    };

const resetContactMethod = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__RESET_CONTACT_METHOD
});

export const updateContactMethod = (info: ContactMethodInfo) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CONTACT_METHOD,
  info
});

export const setExpressCheckoutEligible = (isEligibleForExpressCheckout: boolean) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT,
  isEligibleForExpressCheckout
});

export const updateContactTravelInfoMethod = (info: DutyOfCare) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CONTACT_TRAVEL_INFO_METHOD,
  info
});

export const setEarlyBirdEligibility = (earlyBirdEligibility: EarlyBirdEligibility) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY,
  earlyBirdEligibility
});

export const setEarlyBirdPricingToken = (earlyBirdPricingToken: string) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_PRICING_TOKEN,
  earlyBirdPricingToken
});

export const setEarlyBirdPricingDifference = (earlyBirdPricingDifference: string) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_PRICING_DIFFERENCE,
  earlyBirdPricingDifference
});

export const setExpressCheckoutFromPassengerPage = (isExpressCheckoutFromPassengerPage: boolean) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SET_EXPRESS_CHECKOUT_FROM_PASSENGER_PAGE,
  isExpressCheckoutFromPassengerPage
});

const prefillPassengerInfo = (passengerDetailsPage: *, isInternationalBooking: boolean) => ({
  type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
  passengerDetailsPage,
  isInternationalBooking
});

const checkAndUpdateNewFrequentTravelerSelectionToggle = (
  { frequentTravelerId, frequentTravelerToken }: Passenger,
  paxNumber,
  dispatch
) => {
  if (frequentTravelerId === '' && frequentTravelerToken === '') {
    dispatch(
      updateFrequentTravelerSelection({
        paxNumber,
        frequentTravelerId: '',
        frequentTravelerToken: '',
        addFrequentTravelerToggle: false
      })
    );
  }
};

const { fetchPassengerValidations, fetchPassengerValidationsSuccess, fetchPassengerValidationsFailed } =
  apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_PASSENGER_VALIDATIONS);

export const submitPassengerForm =
  (basicPassengerInfos: PassengerInfos, passengerInfo: Passenger, paxNumber: number, isEditingPax?: boolean = false) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      if (!isEditingPax) {
        dispatch(savePassenger({ index: paxNumber, passengerInfo }));
        checkAndUpdateNewFrequentTravelerSelectionToggle(passengerInfo, paxNumber, dispatch);
      }
      const state = getState();
      const { flightPricingPage, passengerInfos } = state?.app?.airBooking;
      const nextPassengerIndex = paxNumber + 1;
      const passengerValidationInfo = flightPricingPage?.response?.flightPricingPage?._links?.passengerValidation;
      const passengerInfoForValidation = isEditingPax ? basicPassengerInfos : passengerInfos;

      if ((basicPassengerInfos.length === nextPassengerIndex) || isEditingPax) {
        if (passengerValidationInfo) {
          dispatch(fetchPassengerValidations());

          return FlightBookingApi.passengerValidationCall(passengerInfoForValidation, passengerValidationInfo)
            .then((response) => {
              dispatch(fetchPassengerValidationsSuccess(response));
              const { modalDetails } = response?.passengerValidationDetails?.youngTraveler ?? {};

              if (modalDetails) {
                const { body: { additionalText, informationText } = {}, buttons = [], title } = modalDetails;
                const buttonOneText = buttons[0]?.buttonText;
                const buttonTwoText = buttons[1]?.buttonText;

                dispatch(
                  showDialog({
                    buttons: [
                      {
                        label: buttonOneText,
                        onClick: () => dispatch(hideDialog())
                      },
                      {
                        label: buttonTwoText,
                        onClick: () => {
                          dispatch(hideDialog()).then(() => {
                            isEditingPax && dispatch(updatePassenger({ index: paxNumber, passengerInfo }));
                            dispatch(traceYoungTravelerPage());
                            dispatch(push(getNormalizedRoute({ routeName: isEditingPax ? 'youngTravelerEditWithoutClearForm' : 'youngTraveler' })));
                          });
                        },
                        style: PRIMARY
                      }
                    ],
                    contentView: (
                      <div className="young-traveler-dialog--body">
                        <div className="large" dangerouslySetInnerHTML={{ __html: informationText }} />
                        <div className="medium" dangerouslySetInnerHTML={{ __html: additionalText }} />
                      </div>
                    ),
                    name: 'young-traveler-dialog',
                    title,
                    titleClassName: 'young-traveler-dialog--title'
                  })
                );
              } else {
                const parentOrGuardianFormData = state?.app?.formData?.AIR_BOOKING_PARENT_OR_GUARDIAN_FORM;

                parentOrGuardianFormData &&
                dispatch(FormDataActions.clearFormDataById(AIR_BOOKING_PARENT_OR_GUARDIAN_FORM));
                isEditingPax ? dispatch(checkRapidRewardAndUpdatePassenger(basicPassengerInfos, passengerInfo, paxNumber)) : dispatch(push(getNormalizedRoute({ routeName: 'purchase' })));
              }
            })
            .catch((error) => {
              dispatch(fetchPassengerValidationsFailed(error));
            });
        } else {
          isEditingPax ? dispatch(checkRapidRewardAndUpdatePassenger(basicPassengerInfos, passengerInfo, paxNumber)) : dispatch(push(getNormalizedRoute({ routeName: 'purchase' })));
        }
      } else {
        dispatch(push(`${getNormalizedRoute({ routeName: 'passengers' })}/${nextPassengerIndex}`));
      }
    };

export const updatePassengerWithSpecialAssistance =
  (specialAssistanceFormData: FormData, paxNumber: number) => (dispatch: ReduxDispatch<*>) => {
    specialAssistanceFormData && dispatch(updateSpecialAssistance({ index: paxNumber, specialAssistanceFormData }));
    dispatch(goBack());
  };

export const updatePassengerByClearingSpecialAssistance = (paxNumber: number) => (dispatch: ReduxDispatch<*>) => {
  dispatch(clearSpecialAssistance({ index: paxNumber }));
};

export const checkRapidRewardAndUpdatePassenger =
  (passengerInfos: PassengerInfos, passengerInfo: Passenger, paxNumber: number) => (dispatch: ReduxDispatch<*>) => {
    dispatch(updatePassenger({ index: paxNumber, passengerInfo }));
    dispatch(goBack());
  };

export const updateFrequentTravelerSelection = ({
  paxNumber,
  frequentTravelerId,
  frequentTravelerToken,
  addFrequentTravelerToggle
}: SelectedFrequentTravelerType) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FREQUENT_TRAVELER_PAX_ID,
  paxNumber,
  frequentTravelerId,
  frequentTravelerToken,
  addFrequentTravelerToggle
});

export const resumeAfterLogin = (shouldResume: boolean) => ({
  type: AirBookingActionTypes.AIR_BOOKING__FLIGHT_PRICING_RESUME_AFTER_LOGIN,
  shouldResume
});

export const setHasUpsellError = (hasUpsellError: boolean) => ({
  type: AirBookingActionTypes.AIR_BOOKING__FLIGHT_PRICING_SET_HAS_UPSELL_ERROR,
  hasUpsellError
});

/*                           */
/* Low Fare Calendar Actions */
/*                           */

const { fetchLowFareCalendar, fetchLowFareCalendarSuccess, fetchLowFareCalendarFailed } = apiActionCreator(
  AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR
);

export const getLowFareCalendar =
  (searchRequest: FlightProductSearchRequest, path: ?string, isInitialSearch: boolean) => (dispatch: *) => {
    isInitialSearch && dispatch(FlowStatusActions.setFlowStatus('airBooking', STATUS.INITIAL));
    dispatch(fetchLowFareCalendar());

    return FlightBookingApi.getLowFareCalendar(transformToAPIRequest(searchRequest))
      .then((response) => {
        dispatch(updateFlightSearchRequestAndSyncToFormData(searchRequest));
        isInitialSearch && dispatch(FlowStatusActions.setFlowStatus('airBooking', STATUS.IN_PROGRESS));
        saveSearchRequestToLocalStorage(searchRequest);
        const { selectedDepartureDate, selectedReturnDate } = calculateLfcSelectedDates(searchRequest, response);

        dispatch(selectLowFareCalendarOutboundDate(selectedDepartureDate));
        dispatch(selectLowFareCalendarInboundDate(selectedReturnDate));
        dispatch(fetchLowFareCalendarSuccess(response));
        raiseSatelliteEvent('Low Fare Calendar');

        if (path) dispatch(push(path));
      })
      .catch((error) => dispatch(fetchLowFareCalendarFailed(error)));
  };

export const removeFrequentTravelerSelectedByPaxNumber = (paxNumber: number) => ({
  type: AirBookingActionTypes.AIR_BOOKING__REMOVE_SELECTED_FREQUENT_TRAVELER_PAX_ID,
  paxNumber
});

const updateLowFareCalendarOutboundAnalytics = (lowFareCalendarAnalytics) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS,
  lowFareCalendarAnalytics
});

const updateLowFareCalendarInboundAnalytics = (lowFareCalendarAnalytics) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS,
  lowFareCalendarAnalytics
});

const {
  fetchPrevLowFareCalendarOutboundPage,
  fetchPrevLowFareCalendarOutboundPageSuccess,
  fetchPrevLowFareCalendarOutboundPageFailed
} = apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE, {
  isSpinnerNeeded: false
});

export const getPrevLowFareCalendarOutboundPage =
  (searchRequest: FlightProductSearchRequest, currentOutboundPage: LowFareBoundType) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchPrevLowFareCalendarOutboundPage());

      return FlightBookingApi.getLowFareCalendar(transformToAPIRequest(searchRequest))
        .then((response) => {
          const newOutboundPage = _.get(response, 'lowFareCalendarPage.outboundPage');
          const lowFareCalendarAnalytics = _.get(response, 'lowFareCalendarPage.lowFareCalendarAnalytics');

          dispatch(
            fetchPrevLowFareCalendarOutboundPageSuccess(transformToPrevBoundPage(newOutboundPage, currentOutboundPage))
          );
          dispatch(updateLowFareCalendarOutboundAnalytics(lowFareCalendarAnalytics));
          raiseSatelliteEvent('Low Fare Calendar');
        })
        .catch((error) => dispatch(fetchPrevLowFareCalendarOutboundPageFailed(error)));
    };

const {
  fetchNextLowFareCalendarOutboundPage,
  fetchNextLowFareCalendarOutboundPageSuccess,
  fetchNextLowFareCalendarOutboundPageFailed
} = apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE, {
  isSpinnerNeeded: false
});

export const getNextLowFareCalendarOutboundPage =
  (searchRequest: FlightProductSearchRequest, currentOutboundPage: LowFareBoundType) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchNextLowFareCalendarOutboundPage());

      return FlightBookingApi.getLowFareCalendar(transformToAPIRequest(searchRequest))
        .then((response) => {
          const newOutboundPage = _.get(response, 'lowFareCalendarPage.outboundPage');
          const lowFareCalendarAnalytics = _.get(response, 'lowFareCalendarPage.lowFareCalendarAnalytics');

          dispatch(
            fetchNextLowFareCalendarOutboundPageSuccess(transformToNextBoundPage(newOutboundPage, currentOutboundPage))
          );
          dispatch(updateLowFareCalendarOutboundAnalytics(lowFareCalendarAnalytics));
          raiseSatelliteEvent('Low Fare Calendar');
        })
        .catch((error) => dispatch(fetchNextLowFareCalendarOutboundPageFailed(error)));
    };

const {
  fetchPrevLowFareCalendarInboundPage,
  fetchPrevLowFareCalendarInboundPageSuccess,
  fetchPrevLowFareCalendarInboundPageFailed
} = apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE, {
  isSpinnerNeeded: false
});

export const getPrevLowFareCalendarInboundPage =
  (searchRequest: FlightProductSearchRequest, currentInboundPage: LowFareBoundType) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchPrevLowFareCalendarInboundPage());

      return FlightBookingApi.getLowFareCalendar(transformToAPIRequest(searchRequest))
        .then((response) => {
          const newInboundPage = _.get(response, 'lowFareCalendarPage.outboundPage');
          const lowFareCalendarAnalytics = _.get(response, 'lowFareCalendarPage.lowFareCalendarAnalytics');

          dispatch(
            fetchPrevLowFareCalendarInboundPageSuccess(transformToPrevBoundPage(newInboundPage, currentInboundPage))
          );
          dispatch(updateLowFareCalendarInboundAnalytics(lowFareCalendarAnalytics));
          raiseSatelliteEvent('Low Fare Calendar');
        })
        .catch((error) => dispatch(fetchPrevLowFareCalendarInboundPageFailed(error)));
    };

const {
  fetchNextLowFareCalendarInboundPage,
  fetchNextLowFareCalendarInboundPageSuccess,
  fetchNextLowFareCalendarInboundPageFailed
} = apiActionCreator(AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE, {
  isSpinnerNeeded: false
});

export const getNextLowFareCalendarInboundPage =
  (searchRequest: FlightProductSearchRequest, currentInboundPage: ?LowFareBoundType) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchNextLowFareCalendarInboundPage());

      return FlightBookingApi.getLowFareCalendar(transformToAPIRequest(searchRequest))
        .then((response) => {
          const newInboundPage = _.get(response, 'lowFareCalendarPage.outboundPage');
          const lowFareCalendarAnalytics = _.get(response, 'lowFareCalendarPage.lowFareCalendarAnalytics');

          dispatch(
            fetchNextLowFareCalendarInboundPageSuccess(transformToNextBoundPage(newInboundPage, currentInboundPage))
          );
          dispatch(updateLowFareCalendarInboundAnalytics(lowFareCalendarAnalytics));
          raiseSatelliteEvent('Low Fare Calendar');
        })
        .catch((error) => dispatch(fetchNextLowFareCalendarInboundPageFailed(error)));
    };

export const selectLowFareCalendarOutboundDate = (date: ?string) => ({
  type: AirBookingActionTypes.AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_OUTBOUND_DATE,
  date
});

export const selectLowFareCalendarInboundDate = (date: ?string) => ({
  type: AirBookingActionTypes.AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_INBOUND_DATE,
  date
});

const { fetchPricePagePlacements, fetchPricePagePlacementsSuccess, fetchPricePagePlacementsFailed } = apiActionCreator(
  AirBookingActionTypes.AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS
);

export const loadPricePagePlacements =
  (isEligibleForDisplayingChaseBanner: boolean): * =>
    (dispatch: ThunkDispatch, getState: *) => {
      const state = _.cloneDeep(getState());
      const international = _.get(state, 'app.airBooking.isInternationalBooking');
      const EARLY_BIRD_AB_TESTING = _.get(state, 'app.toggles.EARLY_BIRD_AB_TESTING', false);
      const appContexts = [
        ...(shouldShowEarlyBirdInPathForAirbooking(state) ? ['earlyBirdEligible'] : []),
        ...(isSWAVacationEligible(state) ? ['SWAVEligible'] : [])
      ];
      const defaultMboxes = [
        PRICING_CHASE_MBOX_ID,
        PRICE_PROMO_MIDDLE1_MBOX_ID,
        ...(EARLY_BIRD_AB_TESTING ? [EARLY_BIRD_PRICE_VISIBILITY_MBOX_ID] : [])
      ];

      dispatch(fetchPricePagePlacements());

      return dispatch(getTargetParams({}, PRICING_PAGE_ID))
        .then((params) => dispatch(getMboxConfig(PRICING_PAGE_ID, params, defaultMboxes)))
        .then((config) => dispatch(getSegments(config)))
        .then((segments) =>
          dispatch(
            getPlacements(
              PRICING_PAGE_ID,
              [...appContexts, getChaseWcmAppContext(state)],
              segments,
              {
                international,
                persona: getPersona()
              },
              true
            )
          )
        )
        .then((content) => dispatch(fetchPricePagePlacementsSuccess({ ...content, isEligibleForDisplayingChaseBanner })))
        .catch(() => dispatch(fetchPricePagePlacementsFailed()));
    };

export const savePassengerCount = (passengerCount: PassengerCountValue) => ({
  type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT,
  passengerCount
});

export const updateMultiSelectBound = (multiSelectAirportBounds: MultiSelectAirportBounds) => ({
  type: AirBookingActionTypes.AIR_BOOKING__UPDATE_MULTI_SELECT_BOUND,
  multiSelectAirportBounds
});

export const clearMultiSelectBound = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__CLEAR_MULTI_SELECT_BOUND
});

export const resetFlightShoppingResponse = () => ({
  type: AirBookingActionTypes.AIR_BOOKING__RESET_FLIGHT_PRICING_PAGE_RESPONSE
});
