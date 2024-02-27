// @flow
import i18n from '@swa-ui/locale';
import { goBack, push } from 'connected-react-router';
import _ from 'lodash';
import airChangeActionTypes, { apiActionCreator } from 'src/airChange/actions/airChangeActionTypes';
import {
  AIR_CHANGE_SPLIT_PNR_FLOW_NAME,
  FLIGHT_PRODUCT_TYPE,
  TRAVEL_FUNDS
} from 'src/airChange/constants/airChangeConstants';
import { getIsReaccomCoTerminalEligible } from 'src/airChange/helpers/airChangeHelper';
import { generateChangeRequest } from 'src/airChange/helpers/changeRequestHelper';
import { transformToFlightSummary } from 'src/airChange/transformers/airReaccomTripSummaryTransformer';
import {
  initiateVoidTransaction,
  resetAlternativeFormsOfPayment
} from 'src/shared/actions/alternativeFormsOfPaymentActions';
import { resetCalculateFlowData } from 'src/shared/actions/applyTravelFundsActions';
import * as ContactMethodActions from 'src/shared/actions/contactMethodActions';
import { resetSavedCreditCards, setSavedCC } from 'src/shared/actions/creditCardActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { updateFormFieldDataValue } from 'src/shared/actions/formDataActions';
import { asyncChainStart, asyncChainFinish } from 'src/shared/actions/sharedActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as AirChangeApi from 'src/shared/api/airChangeApi';
import * as AirReaccomApi from 'src/shared/api/airReaccomApi';
import * as ContentDeliveryApi from 'src/shared/api/contentDeliveryApi';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import * as ReservationApi from 'src/shared/api/reservationApi';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';
import { ERROR_HAWAII_MESSAGE, ERROR_NO_ROUTES_EXISTS } from 'src/shared/constants/errorCodes';
import { INBOUND } from 'src/shared/constants/flightBoundTypes';
import { STATUS } from 'src/shared/constants/flowConstants';
import { AIR_CHANGE_REVIEW_FORM, AIR_CHANGE_SHOPPING_SEARCH_FORM } from 'src/shared/constants/formIds';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import { CHANNEL } from 'src/shared/constants/requestParameter';
import * as contactMethodPageHelper from 'src/shared/helpers/contactMethodPageHelper';
import { dispatchHideDialog } from 'src/shared/helpers/dialogHelper';
import { containsApiErrorCodes, isSessionTimeoutError } from 'src/shared/helpers/errorCodesHelper';
import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import { get } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { generatePricingRequest } from 'src/shared/helpers/shoppingPageHelper';
import { generateSearchRequest } from 'src/shared/helpers/shoppingSearchHelper';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { store } from 'src/shared/redux/createStore';
import { toChapiAfpErrorLog } from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import { generateDialogConfigFromError } from 'src/shared/transformers/dialogTransformer';
import { transformToNoRoutesErrorDialogOptions } from 'src/shared/transformers/flightProductSearchRequestTransformer';
import { clearAllApplyForms } from 'src/travelFunds/actions/travelFundsActions';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';
import store2 from 'store2';

import type { Dispatch as ReduxDispatch } from 'redux';
import type {
  FareProductionSelection,
  FlightChangeRequestDataType,
  PassengerNameRecord,
  SearchFlightOptions,
  SearchRequest,
  SelectedFlight,
  SelectedProducts
} from 'src/airChange/flow-typed/airChange.types';
import type { ContactMethodInfo, Dispatch as ThunkDispatch, PaymentInfo } from 'src/shared/flow-typed/shared.types';

const {
  AIR_CHANGE__CLEAR_SELECTED_PRODUCTS,
  AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION,
  AIR_CHANGE__FETCH_FLIGHT_PRICING,
  AIR_CHANGE__FETCH_FLIGHT_SHOPPING,
  AIR_CHANGE__FETCH_PASSENGER_INFO,
  AIR_CHANGE__FETCH_PAYMENT_OPTIONS,
  AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING,
  AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE,
  AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION,
  AIR_CHANGE__FLIGHT_PRICING_RESUME_AFTER_LOGIN,
  AIR_CHANGE__REACCOM_CLEAR_SELECTED_PRODUCTS,
  AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS,
  AIR_CHANGE__REACCOM_SORT_SHOPPING_PAGE_BY,
  AIR_CHANGE__RESET_FLOW_DATA,
  AIR_CHANGE__RESET_PAYMENT_INFO,
  AIR_CHANGE__RESET_REACCOM_CONFIRMATION_PAGE,
  AIR_CHANGE__SAVE_CONTACT_INFORMATION,
  AIR_CHANGE__SAVE_PAYMENT_INFO,
  AIR_CHANGE__SAVE_PNR,
  AIR_CHANGE__SAVE_REACCOM_COTERMINAL_PRODUCTS,
  AIR_CHANGE__SAVE_REACCOM_PNR,
  AIR_CHANGE__SAVE_SELECTED_BOUNDS,
  AIR_CHANGE__SAVE_SELECTED_FLIGHT,
  AIR_CHANGE__SAVE_SELECTED_PRODUCTS,
  AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST,
  AIR_CHANGE__SORT_SHOPPING_PAGE_BY,
  AIR_CHANGE__UPDATE_CONTACT_METHOD,
  AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD
} = airChangeActionTypes;
const { PAYPAL_DATA_KEY } = StorageKeys;

export const { fetchReservationChangeable, fetchReservationChangeableSuccess, fetchReservationChangeableFailed } =
  apiActionCreator(AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE);

const { fetchFlightShopping, fetchFlightShoppingSuccess, fetchFlightShoppingFailed } = apiActionCreator(
  AIR_CHANGE__FETCH_FLIGHT_SHOPPING
);

export const retrieveReservationChangeable =
  (request: Link) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchReservationChangeable(request));
      dispatch(resetAirChangeFlowData());

      return ReservationApi.retrieveReservationChangeable(request)
        .then((response) => {
          dispatch(fetchReservationChangeableSuccess(response));
          const { query, href } = request;
          const pnr = generatePnr(query, href);

          dispatch(savePNR(pnr));

          return response;
        })
        .catch((error) => {
          dispatch(fetchReservationChangeableFailed(error));
          throw error;
        });
    };

export const retrieveReservationChangeableWithSearchToken = (searchToken: string, asyncChainInitiated?: boolean) => (dispatch: ThunkDispatch) => 
  dispatch(ViewReservationActions.retrieveFlightReservation({ passengerSearchToken: searchToken }, true))
    .then(viewReservationViewPage => {
      const { change } = get(viewReservationViewPage, 'viewReservationViewPage._links');

      dispatch(FlowStatusActions.setFlowStatus('airChange', STATUS.IN_PROGRESS));

      if (!asyncChainInitiated) {
        dispatch(asyncChainStart());
      }

      return dispatch(retrieveReservationChangeable(change))
        .then((changeFlightPage) => {
          const splitPnrDetails = get(changeFlightPage, 'changeFlightPage.splitPnrDetails');

          if (splitPnrDetails) {
            dispatch(FlowStatusActions.setFlowStatus(AIR_CHANGE_SPLIT_PNR_FLOW_NAME, STATUS.INITIAL));
            dispatch(push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'selectPassengers' }), {}, { searchToken })));
          }

          dispatch(asyncChainFinish());

          return changeFlightPage;
        });
    });

export const { fetchSplitPnrReservation, fetchSplitPnrReservationSuccess, fetchSplitPnrReservationFailed } =
  apiActionCreator(AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION);

export const getSplitPnrReservationForChange =
  (link: Link, searchToken: string = '') =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchSplitPnrReservation(link));
      dispatch(FlowStatusActions.setFlowStatus(AIR_CHANGE_SPLIT_PNR_FLOW_NAME, STATUS.IN_PROGRESS));

      return ReservationApi.retrieveSplitPnrReservation(link)
        .then((response) => {
          const queryParams = searchToken ? { searchToken } : {};

          dispatch(fetchSplitPnrReservationSuccess(response));
          dispatch(FlowStatusActions.setFlowStatus(AIR_CHANGE_SPLIT_PNR_FLOW_NAME, STATUS.COMPLETED));
          dispatch(push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'view' }), {}, queryParams)));
        })
        .catch((error) => {
          dispatch(fetchSplitPnrReservationFailed(error));
        });
    };

const _handleHawaiiNoRoutesError = (error, dispatch, searchRequest) => {
  const query = { pageId: 'hawaii-no-routes-popup', channel: CHANNEL };

  ContentDeliveryApi.getContent(query)
    .then((response) => {
      const { buttons, errorTitle, errorDescription } = get(response, 'results.noRouteExistsHawaii.content');
      const transformButtonToLinks = () => {
        const filteredButtons = _.reject(buttons, ['buttonText', 'OK']);

        return _.map(filteredButtons, (button) => ({
          label: button.buttonText,
          href: button.target,
          onClick: dispatchHideDialog,
          isExternal: button.linkType === 'webview'
        }));
      };

      const links = transformButtonToLinks();

      dispatch(
        showDialog({
          active: true,
          title: errorTitle,
          name: 'no-routes-hawaii-error',
          message: errorDescription,
          closeLabel: i18n('SHARED__BUTTON_TEXT__OK'),
          error,
          onClose: dispatchHideDialog,
          verticalLinks: {
            links
          }
        })
      );
    })
    .catch(() => {
      showDialog(transformToNoRoutesErrorDialogOptions(error, searchRequest));
      dispatch(showDialog(transformToNoRoutesErrorDialogOptions(error, searchRequest)));
    });
};

const saveShoppingSearchRequest = (searchRequest: SearchRequest) => ({
  type: AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST,
  searchRequest
});

export const searchForFlights = (options: SearchFlightOptions, goToNextPage?: () => void, pathname: string = '') => {
  store2.session.remove(StorageKeys.PAYPAL_DATA_KEY);
  const { searchRequest, ...others } = options;

  return (dispatch: *): Promise<*> => {
    dispatch(fetchFlightShopping());

    return AirChangeApi.findFlightProducts(
      generateSearchRequest({
        searchRequest,
        ...others
      })
    )
      .then((response) => {
        const { departureAndReturnDate } = searchRequest;

        dispatch(
          updateFormFieldDataValue(AIR_CHANGE_SHOPPING_SEARCH_FORM, `departureAndReturnDate`, departureAndReturnDate)
        );
        dispatch(fetchFlightShoppingSuccess(response));
        dispatch(saveShoppingSearchRequest(searchRequest));
        goToNextPage && goToNextPage();
      })
      .catch((originalError) => {
        const isHawaiiNoRoutesError = containsApiErrorCodes(originalError, ERROR_HAWAII_MESSAGE);
        const isNonHawaiiNoRoutesError = containsApiErrorCodes(originalError, ERROR_NO_ROUTES_EXISTS);

        const isCustomized = isHawaiiNoRoutesError || isNonHawaiiNoRoutesError;
        const error = isCustomized ? _.merge(originalError, { $customized: true }) : originalError;
        const isNonHawaiiNoRoutesErrorMessages = {
          title: i18n('ERROR__NO_ROUTES_EXISTS_HEADER'),
          message: i18n('ERROR__NO_ROUTES_EXISTS')
        };

        const transformedSearchRequest = {
          origin: get(searchRequest, 'from'),
          destination: get(searchRequest, 'to'),
          departureDate: get(searchRequest, 'departureDate')
        };

        dispatch(fetchFlightShoppingFailed(error));

        isHawaiiNoRoutesError && _handleHawaiiNoRoutesError(originalError, dispatch, transformedSearchRequest);
        isNonHawaiiNoRoutesError &&
          _handleNonHawaiiNoRoutesError(
            originalError,
            transformedSearchRequest,
            isNonHawaiiNoRoutesErrorMessages,
            pathname,
            dispatch
          );
      });
  };
};

const returnToChangeShoppingPage = () => {
  store.dispatch(push(getNormalizedRoute({ routeName: 'flightShoppingIndex' })));
};

const _handleNonHawaiiNoRoutesError = (error, searchRequest, isNonHawaiiNoRoutesErrorMessages, pathname, dispatch) => {
  const isShoppingSearchPage = pathname === getNormalizedRoute({ routeName: 'flightShoppingIndex' });
  const shouldReturnToChangeShoppingPage = !isShoppingSearchPage;

  if (shouldReturnToChangeShoppingPage) {
    dispatch(
      showDialog(
        transformToNoRoutesErrorDialogOptions(
          error,
          searchRequest,
          isNonHawaiiNoRoutesErrorMessages,
          returnToChangeShoppingPage
        )
      )
    );
  } else {
    dispatch(showDialog(transformToNoRoutesErrorDialogOptions(error, searchRequest, isNonHawaiiNoRoutesErrorMessages)));
  }
};

export const selectFare = (selectedFlight: SelectedFlight) => (dispatch: ReduxDispatch<*>) => {
  const { direction, paxType = PassengerTypes.ADULT } = selectedFlight.flightDetails.params;
  const updatedSelectedFlight = {
    ...selectedFlight,
    flightDetails: {
      ...selectedFlight.flightDetails,
      params: {
        ...selectedFlight.flightDetails.params,
        paxType
      }
    }
  };

  dispatch(saveSelectedFlight(updatedSelectedFlight));

  dispatch(
    push(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'selectFare' }), {
        direction,
        paxType
      })
    )
  );

  raiseSatelliteEvent('select new fare page');
};

const saveSelectedFlight = (selectedFlight: SelectedFlight) => ({
  type: AIR_CHANGE__SAVE_SELECTED_FLIGHT,
  selectedFlight
});

export const resetAirChangeData = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(resetCalculateFlowData());
  dispatch(resetReaccomConfirmationPage());
  dispatch(resetPaymentInfo());
  dispatch(resetSavedCreditCards());
};

export const resetPaymentInfo = () => ({
  type: AIR_CHANGE__RESET_PAYMENT_INFO
});

export const sortAirChangeShoppingPage = (sortStrategy: string, direction: string, isReaccom: boolean) => {
  const type = isReaccom ? AIR_CHANGE__REACCOM_SORT_SHOPPING_PAGE_BY : AIR_CHANGE__SORT_SHOPPING_PAGE_BY;

  return {
    type,
    direction,
    sortStrategy
  };
};

export const saveSelectedProducts = (selectedProducts: SelectedProducts, isReaccom: boolean) => {
  const type = isReaccom ? AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS : AIR_CHANGE__SAVE_SELECTED_PRODUCTS;

  return {
    type,
    selectedProducts
  };
};

export const clearSelectedProducts = (isReaccom: boolean) => {
  const type = isReaccom ? AIR_CHANGE__REACCOM_CLEAR_SELECTED_PRODUCTS : AIR_CHANGE__CLEAR_SELECTED_PRODUCTS;

  return { type };
};

export const saveSelectedBounds = (selectedBounds: *) => ({
  type: AIR_CHANGE__SAVE_SELECTED_BOUNDS,
  selectedBounds
});

export const savePNR = (pnr: PassengerNameRecord) => ({
  type: AIR_CHANGE__SAVE_PNR,
  pnr
});

export const resetAirChangeFlowData = () => ({
  type: AIR_CHANGE__RESET_FLOW_DATA
});

const { fetchFlightPricing, fetchFlightPricingSuccess, fetchFlightPricingFailed } = apiActionCreator(
  AIR_CHANGE__FETCH_FLIGHT_PRICING
);

export const fareSelected =
  (selection: FareProductionSelection, pricingAction: * = goToPricing) =>
    (dispatch: *) => {
      const {
        fareProduct,
        flightCardIndex,
        isDynamicWaiver,
        isLoggedIn,
        isReaccom,
        page: {
          _links,
          checkedInNotice,
          flightBoundPageInfo,
          isChangingTwoBounds,
          isOutbound,
          params: { direction, paxType = PassengerTypes.ADULT }
        },
        selectedBounds,
        selectedProducts,
        sortByValue
      } = selection;
      const changePricingPage = get(_links, 'changePricingPage');
      const fareProductId = isReaccom
        ? get(fareProduct, '_meta.reaccomProductId')
        : get(fareProduct, '_meta.productId');
      const flightProductType = isDynamicWaiver ? FLIGHT_PRODUCT_TYPE.DYNAMIC_WAIVER : FLIGHT_PRODUCT_TYPE.NORMAL;

      const allSelectedProducts = _.merge({}, selectedProducts, {
        [direction]: {
          flightCardIndex,
          flightProductType,
          fareProductId
        }
      });

      if (isReaccom && flightBoundPageInfo) {
        const selectedNewProducts = isChangingTwoBounds ? allSelectedProducts.newProducts : {};

        allSelectedProducts.newProducts = {
          ...selectedNewProducts,
          [direction]: transformToFlightSummary(flightBoundPageInfo, fareProduct)
        };
      }

      dispatch(saveSelectedProducts(allSelectedProducts, isReaccom));
      dispatch(updateShouldForbidForward(false));

      const toPricing = () => {
        dispatch(pricingAction(changePricingPage, allSelectedProducts, isLoggedIn, true));
      };

      const isNextPathExist = isOutbound && selectedBounds.secondbound;

      if (isNextPathExist) {
        dispatch(sortAirChangeShoppingPage(sortByValue, INBOUND, isReaccom));
        dispatch(
          push(
            buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'flightShopping' }), {
              direction: INBOUND,
              paxType
            })
          )
        );
      } else {
        if (checkedInNotice && !isReaccom) {
          dispatch(
            showDialog({
              title: get(checkedInNotice, 'title'),
              message: get(checkedInNotice, 'message'),
              buttons: [
                {
                  label: 'OK',
                  onClick: () => {
                    dispatch(hideDialog()).then(toPricing);
                  }
                },
                {
                  label: 'Cancel',
                  onClick: () => {
                    dispatch(hideDialog());
                  }
                }
              ]
            })
          );
        } else {
          !isReaccom && toPricing();
          isReaccom && dispatch(push(getNormalizedRoute({ routeName: 'reaccom' })));
        }
      }
    };

const handleGetPricingSuccess = (dispatch, response, successRoute: string, ignoreNavigationLogic: boolean = false) => {
  dispatch(fetchFlightPricingSuccess(response));

  if (!ignoreNavigationLogic) {
    return response?.changePricingPage?.isRepriceNotification
      ? dispatch(push(getNormalizedRoute({ routeName: 'reprice' })))
      : dispatch(push(successRoute));
  }
};

export const goToPricing =
  (
    changePricingPage: Link,
    selectedProducts: SelectedProducts,
    isLoggedIn: boolean,
    shouldResetCalculateFundsFlow: boolean = false,
    ignoreNavigationLogic: boolean = false
  ) =>
    (dispatch: *) => {
      const pricingRequest = generatePricingRequest(changePricingPage, selectedProducts);

      dispatch(fetchFlightPricing(pricingRequest));
      dispatch(resetAlternativeFormsOfPayment());

      return dispatch(
        _getPricing(
          pricingRequest,
          isLoggedIn,
          getNormalizedRoute({ routeName: 'price' }),
          shouldResetCalculateFundsFlow,
          ignoreNavigationLogic
        )
      );
    };

export const goToPricingReview =
  (
    request: Link,
    isLoggedIn: boolean = false,
    shouldResetCalculateFundsFlow: boolean = false,
    ignoreNavigationLogic: boolean = false
  ) =>
    (dispatch: *) => {
      dispatch(fetchFlightPricing(request));
      dispatch(resetAlternativeFormsOfPayment());
      dispatch(setAirChangeFlowStatus(STATUS.IN_PROGRESS));

      return dispatch(
        _getPricing(
          request,
          isLoggedIn,
          getNormalizedRoute({ routeName: 'reconcile' }),
          shouldResetCalculateFundsFlow,
          ignoreNavigationLogic
        )
      );
    };

const _getPricing =
  (
    request: *,
    isLoggedIn: boolean,
    path: string,
    shouldResetCalculateFundsFlow: boolean,
    ignoreNavigationLogic: boolean
  ) =>
    (dispatch: *) =>
      AirChangeApi.getPricing(request, isLoggedIn)
        .then((response) => {
          shouldResetCalculateFundsFlow && dispatch(resetCalculateFlowData());
          dispatch(clearAllApplyForms());
          handleGetPricingSuccess(dispatch, response, path, ignoreNavigationLogic);
        })
        .catch((error) => {
          const errorCode = get(error, 'responseJSON.code');

          if (errorCode === TRAVEL_FUNDS.TOKEN_EXPIRED_AIRCHANGE_CODE) {
            const dialogConfig = generateDialogConfigFromError(error);

            dispatch(fetchFlightPricingFailed(error));
            dispatch(
              showDialog({
                name: 'fund-token-expired-message',
                buttons: [
                  {
                    label: i18n('SHARED__BUTTON_TEXT__OK'),
                    onClick: () => {
                      dispatch(hideDialog()).then(() => {
                        dispatch(push(getNormalizedRoute({ routeName: 'viewReservationIndex' })));
                      });
                    }
                  }
                ],
                ...dialogConfig
              })
            );
          } else {
            dispatch(fetchFlightPricingFailed(error));
          }
        });

const saveContactInformation = (contactMethodInfo: ContactMethodInfo) => ({
  type: AIR_CHANGE__SAVE_CONTACT_INFORMATION,
  contactMethodInfo
});

export const updateContactMethod = (contactMethodInfo: ContactMethodInfo) => ({
  type: AIR_CHANGE__UPDATE_CONTACT_METHOD,
  contactMethodInfo
});

const { fetchPassengerInfo, fetchPassengerInfoSuccess, fetchPassengerInfoFailed } = apiActionCreator(
  AIR_CHANGE__FETCH_PASSENGER_INFO
);

export const getPassengerInfo = (isInternational: boolean) => (dispatch: ReduxDispatch<*>) => {
  dispatch(fetchPassengerInfo());

  return FlightBookingApi.fetchPassengerInfo()
    .then(({ passengerDetailsPage }) => {
      dispatch(
        saveContactInformation(
          contactMethodPageHelper.prefillPassengerInfoHelper(passengerDetailsPage, isInternational)
        )
      );
      dispatch(fetchPassengerInfoSuccess(passengerDetailsPage));
    })
    .catch((err) => dispatch(fetchPassengerInfoFailed(err)));
};

const { fetchPaymentOptions, fetchPaymentOptionsSuccess, fetchPaymentOptionsFailed } = apiActionCreator(
  AIR_CHANGE__FETCH_PAYMENT_OPTIONS
);

export const getPaymentOptions = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(fetchPaymentOptions());

  return AccountsApi.fetchPaymentOptions()
    .then(({ paymentSavedCreditCardsPage }) => {
      dispatch(setSavedCC(paymentSavedCreditCardsPage));
      dispatch(fetchPaymentOptionsSuccess(paymentSavedCreditCardsPage));
    })
    .catch((err) => dispatch(fetchPaymentOptionsFailed(err)));
};

const { fetchChangeFlightConfirmation, fetchChangeFlightConfirmationSuccess, fetchChangeFlightConfirmationFailed } =
  apiActionCreator(AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION);

export const changeFlight =
  (flightChangeRequestData: FlightChangeRequestDataType, changeConfirmationPageLink: Link, isLoggedIn: boolean) =>
    (dispatch: *, getState: *) => {
      const state = getState();

      dispatch(fetchChangeFlightConfirmation());
      const request = generateChangeRequest(flightChangeRequestData, changeConfirmationPageLink);
      const CEPTOR_VOID_API = state?.app?.toggles?.CEPTOR_VOID_API;

      store2.session.remove(PAYPAL_DATA_KEY);

      return AirChangeApi.changePurchase(request, isLoggedIn)
        .then(({ changeConfirmation }) => {
          dispatch(fetchChangeFlightConfirmationSuccess(changeConfirmation));
          dispatch(setAirChangeFlowStatus(STATUS.COMPLETED));
          dispatch(push(getNormalizedRoute({ routeName: 'confirmation' })));
          playHapticFeedback();

          const { contactMethodInfo } = flightChangeRequestData;

          dispatch(ContactMethodActions.updateSavedContactMethod(contactMethodInfo));
        })
        .catch((error) => {
          const isApplePay = get(request, 'body.payment.newCreditCard.digitalPaymentType') === APPLE_PAY.key;

          dispatch(FormDataActions.updateFormFieldDataValue(AIR_CHANGE_REVIEW_FORM, 'securityCode', ''));

          if (isApplePay) {
            sendErrorLog(toChapiAfpErrorLog(error, PAYMENT_METHODS.APPLE_PAY));

            if (!CEPTOR_VOID_API || !isSessionTimeoutError(error)) {
              dispatch(initiateVoidTransaction(PAYMENT_METHODS.APPLE_PAY, error));
            }
            dispatch(fetchChangeFlightConfirmationFailed());
          } else {
            dispatch(fetchChangeFlightConfirmationFailed(error));
          }
        });
    };

const setAirChangeFlowStatus = (status: string) => FlowStatusActions.setFlowStatus('airChange', status);

export const resumeAfterLogin = (shouldResume: boolean) => ({
  type: AIR_CHANGE__FLIGHT_PRICING_RESUME_AFTER_LOGIN,
  shouldResume
});

export const savePaymentInfoAndGoToReviewPage = (paymentInfo: PaymentInfo) => (dispatch: ReduxDispatch<*>) => {
  dispatch(savePaymentInfo(paymentInfo));
  dispatch(goBack());
  dispatch(FormDataActions.updateFormFieldDataValue(AIR_CHANGE_REVIEW_FORM, 'securityCode', ''));
};

const savePaymentInfo = (paymentInfo: PaymentInfo) => ({
  type: AIR_CHANGE__SAVE_PAYMENT_INFO,
  paymentInfo
});

export const updateShouldForbidForward = (shouldForbidForward: boolean) => ({
  type: AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD,
  shouldForbidForward
});

const { fetchReaccomFlightPage, fetchReaccomFlightPageSuccess, fetchReaccomFlightPageFailed } = apiActionCreator(
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE
);

export const retrieveReaccomFlightProducts =
  (request: Link) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchReaccomFlightPage(request));
      dispatch(resetAirChangeFlowData());

      return AirReaccomApi.findFlightReaccomProducts(request)
        .then((response) => {
          const { query, href } = request;
          const pnr = generatePnr(query, href);

          dispatch(saveReaccomPNR(pnr));
          dispatch(fetchReaccomFlightPageSuccess(response));
        })
        .catch((error) => {
          dispatch(fetchReaccomFlightPageFailed(error));
          throw error;
        });
    };

const { fetchReaccomFlightShopping, fetchReaccomFlightShoppingSuccess, fetchReaccomFlightShoppingFailed } =
  apiActionCreator(AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING);

export const searchForReaccomFlights =
  (request: Link, pushToPath?: string) =>
    (dispatch: ReduxDispatch<*>, getState: () => *): Promise<*> => {
      const reaccomBoundSelections = getState()?.app?.airChange?.reaccomFlightPage?.response?.boundSelections;
      const isReaccomCoTerminalEligible =
      reaccomBoundSelections && getIsReaccomCoTerminalEligible(reaccomBoundSelections);

      dispatch(fetchReaccomFlightShopping(request));

      return AirReaccomApi.findReaccomFlightShopping(request)
        .then((response) => {
          dispatch(fetchReaccomFlightShoppingSuccess(response));
          isReaccomCoTerminalEligible && dispatch(saveReaccomCoTerminalProducts(request));
          pushToPath && dispatch(push(pushToPath));
        })
        .catch((error) => dispatch(fetchReaccomFlightShoppingFailed(error)));
    };

export const resetReaccomConfirmationPage = () => ({
  type: AIR_CHANGE__RESET_REACCOM_CONFIRMATION_PAGE
});

const { fetchReaccomConfirmationPage, fetchReaccomConfirmationPageSuccess, fetchReaccomConfirmationPageFailed } =
  apiActionCreator(AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE);

export const changeReaccomFlight =
  (request: Link, isLoggedIn: boolean) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchReaccomConfirmationPage(request));

      return AirReaccomApi.reaccomPurchase(request, isLoggedIn)
        .then((response) => {
          dispatch(fetchReaccomConfirmationPageSuccess(response));
          dispatch(setAirChangeFlowStatus(STATUS.COMPLETED));
          dispatch(push(getNormalizedRoute({ routeName: 'confirmation' })));
          playHapticFeedback();
        })
        .catch((error) => {
          dispatch(fetchReaccomConfirmationPageFailed(error));
          throw error;
        });
    };

export const saveReaccomPNR = (pnr: PassengerNameRecord) => ({
  type: AIR_CHANGE__SAVE_REACCOM_PNR,
  pnr
});

export const saveReaccomCoTerminalProducts = (reaccomCoTerminalProducts: Link) => ({
  type: AIR_CHANGE__SAVE_REACCOM_COTERMINAL_PRODUCTS,
  reaccomCoTerminalProducts
});

const generatePnr = (query: *, href: string): PassengerNameRecord => ({
  confirmationNumber: href.split('/').pop(),
  firstName: get(query, 'first-name'),
  lastName: get(query, 'last-name')
});
