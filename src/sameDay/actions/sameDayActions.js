// @flow
import { fireTrack } from '@swa-ui/analytics';
import i18n from '@swa-ui/locale';
import { goBack, push } from 'connected-react-router';
import { history } from 'src/appHistory';
import { showReLoginModal } from 'src/login/actions/reLoginModalActions';
import SameDayActionTypes, { apiActionCreator } from 'src/sameDay/actions/sameDayActionTypes';
import { sameDayRoutes } from 'src/sameDay/constants/sameDayRoutes';
import { generateSameDayConfirmationRequest } from 'src/sameDay/transformers/sameDayPurchaseRequestTransformer';
import { initiateVoidTransaction, resetAlternativeFormsOfPayment } from 'src/shared/actions/alternativeFormsOfPaymentActions';
import { resetSavedCreditCards } from 'src/shared/actions/creditCardActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { asyncChainStart, asyncChainFinish } from 'src/shared/actions/sharedActions';
import { splitRequestIdIntoTokens } from 'src/shared/api/helpers/errorHelper';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import * as sameDayApi from 'src/shared/api/sameDayApi';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';
import { ERROR_SAME_DAY_LOGIN_MISMATCH, ERROR_SHOULD_REDIRECT_TO_HOME_PAGE } from 'src/shared/constants/errorCodes.js';
import { STATUS } from 'src/shared/constants/flowConstants';
import { SAME_DAY_REVIEW_FORM, SAME_DAY_SORT_FILTER_FORM } from 'src/shared/constants/formIds';
import { isSessionTimeoutError } from 'src/shared/helpers/errorCodesHelper';
import { get, isEmpty } from 'src/shared/helpers/jsUtils';
import { toChapiAfpErrorLog } from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import { getPlacements } from 'src/wcm/actions/wcmActions';
import { SAME_DAY_STANDBY_CONFIRMATION_PAGE_ID } from 'src/wcm/constants/wcmConstants';

import type { Dispatch as ReduxDispatch } from 'redux';
import type {
  AmountDue,
  SameDayCancellation,
  SameDayConfirmationRequest,
  SameDayConfirmationRefundRequest,
  SameDayPricingRequest,
  SameDayShoppingRequest,
  ViewForSameDayPage
} from 'src/sameDay/flow-typed/sameDay.types';
import type {
  ApiErrorType,
  Dispatch as ThunkDispatch,
  FlightProductCard,
  PaymentInfo,
  SameDayFlightDetailsRequest
} from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { CancelStandbyListing } from 'src/standby/flow-typed/standby.types';

const {
  SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS,
  SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO,
  SAME_DAY__FETCH_SAME_DAY_PRICING_INFO,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  SAME_DAY__RESET_FLOW_DATA,
  SAME_DAY__RESET_PAYMENT_INFO,
  SAME_DAY__SAVE_CHANGE_FLOW,
  SAME_DAY__SAVE_PAYMENT_INFO,
  SAME_DAY__SAVE_SELECTED_FLIGHT,
  SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER,
  SAME_DAY__UPDATE_SAME_DAY_CANCELLATION,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION
} = SameDayActionTypes;

export const shouldRedirectToHomePage = (state: *, error: ApiErrorType) =>
  state?.app?.webView.isWebView || error?.responseJSON?.code === ERROR_SHOULD_REDIRECT_TO_HOME_PAGE;

const {
  fetchConfirmationPagePlacements,
  fetchConfirmationPagePlacementsSuccess,
  fetchConfirmationPagePlacementsFailed
} = apiActionCreator(SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS);
const { fetchSameDayFlightDetailsInfo, fetchSameDayFlightDetailsInfoSuccess, fetchSameDayFlightDetailsInfoFailed } =
  apiActionCreator(SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO);
const { fetchSameDayPricingInfo, fetchSameDayPricingInfoSuccess, fetchSameDayPricingInfoFailed } = apiActionCreator(
  SAME_DAY__FETCH_SAME_DAY_PRICING_INFO
);
const { fetchSameDayShoppingInfo, fetchSameDayShoppingInfoSuccess, fetchSameDayShoppingInfoFailed } = apiActionCreator(
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  { shouldRedirectToHomePage }
);
const { updateSameDayCancellation, updateSameDayCancellationSuccess, updateSameDayCancellationFailed } =
  apiActionCreator(SAME_DAY__UPDATE_SAME_DAY_CANCELLATION);
const { updateSameDayConfirmation, updateSameDayConfirmationSuccess, updateSameDayConfirmationFailed } =
  apiActionCreator(SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION, { shouldRedirectToHomePage });
const {
  updateSameDayConfirmationRefund,
  updateSameDayConfirmationRefundFailed,
  updateSameDayConfirmationRefundSuccess
} = apiActionCreator(SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND);

export const applySameDayShoppingPageSortFilter = () => (dispatch: ReduxDispatch<*>, getState: () => *) => {
  const state = getState();
  const formData = state.app?.formData?.[SAME_DAY_SORT_FILTER_FORM]?.data;

  dispatch({
    type: SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER,
    formData
  });
};

export const retrieveSameDayShoppingInformation =
  (sameDayShoppingInfo: SameDayShoppingRequest, boundReference: string, replace: boolean = false) => 
    (dispatch: ReduxDispatch<*>) => {
      dispatch(fetchSameDayShoppingInfo());
      dispatch(FlowStatusActions.setFlowStatus('sameDay', STATUS.INITIAL));
      dispatch(FormDataActions.clearFormDataById(SAME_DAY_SORT_FILTER_FORM));

      return sameDayApi.retrieveSameDayShoppingInformation(sameDayShoppingInfo, boundReference)
        .then(({ sameDayShoppingPage }) => {
          dispatch(fetchSameDayShoppingInfoSuccess(sameDayShoppingPage));
          dispatch(FlowStatusActions.setFlowStatus('sameDay', STATUS.IN_PROGRESS));

          if (replace) {
            history.replace(sameDayRoutes.shopping);
          } else {
            history.push(sameDayRoutes.shopping);
          }
        })
        .catch((error) => {
          dispatch(FlowStatusActions.setFlowStatus('sameDay', STATUS.IN_PROGRESS));

          return dispatch(fetchSameDayShoppingInfoFailed(error));
        });
    };

export const retrieveSameDayShoppingInformationMethod =
  (viewForSameDayPage: ViewForSameDayPage, selectedBoundIndex: number, replace: boolean) =>
    (dispatch: ThunkDispatch) => {
      const sameDayShoppingInfo = viewForSameDayPage?._links?.sameDayShopping;
      const boundReference =
        (viewForSameDayPage?.boundSelections &&
          viewForSameDayPage?.boundSelections?.[selectedBoundIndex]?.boundReference) ??
        {};

      sameDayShoppingInfo && dispatch(retrieveSameDayShoppingInformation(sameDayShoppingInfo, boundReference, replace));
    };

export const retrieveSameDayPricingDetailsInformation =
  (sameDayPricingRequest: SameDayPricingRequest) => (dispatch: ReduxDispatch<*>) => {
    dispatch(fetchSameDayPricingInfo());

    return sameDayApi.retrieveSameDayPricingInformation(sameDayPricingRequest)
      .then(({ sameDayPricingPage }) => {
        dispatch(fetchSameDayPricingInfoSuccess(sameDayPricingPage));
        dispatch(FlowStatusActions.setFlowStatus('sameDay', STATUS.IN_PROGRESS));
        history.push('/same-day/price-difference');
      })
      .catch((error) => dispatch(fetchSameDayPricingInfoFailed(error)));
  };

const _handleSameDayAccountMismatchError = (error: ApiErrorType) => (dispatch: *) => 
  dispatch(
    showDialog({
      active: true,
      message: error.responseJSON.message,
      error,
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__OK'),
          onClick: () =>
            dispatch(hideDialog()).then(() =>
              dispatch(showReLoginModal(() => {}, { isAccountNumberEditable: true, hasCancelButton: true }))
            )
        }
      ]
    })
  );

const getAsyncChainMessages = () => [i18n('SPINNER_MESSAGE__HANG_TIGHT'), i18n('SPINNER_MESSAGE__STILL_WORKING')];

export const updateSameDayConfirmationMethod =
  (
    isLoggedIn: boolean,
    formData: FormData,
    sameDayConfirmationRequest: SameDayConfirmationRequest,
    cancelStandbyListing?: CancelStandbyListing | null,
    amountDue?: ?AmountDue,
    asyncChainInitiated?: boolean,
    errorHandler?: () => void
  ) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      const { app: { webView: { isWebView } = {}, toggles: { CEPTOR_VOID_API } = {} } = {} } = getState();
      const sameDayConfirmationRequestLink = generateSameDayConfirmationRequest(formData, sameDayConfirmationRequest, amountDue);

      dispatch(updateSameDayConfirmation());

      if (!asyncChainInitiated) {
        dispatch(asyncChainStart(getAsyncChainMessages()));
      }

      return sameDayApi.updateSameDayConfirmation(isLoggedIn, sameDayConfirmationRequestLink)
        .then(({ sameDayConfirmation }) => {
          dispatch(updateSameDayConfirmationRefundSuccess());
          dispatch(updateSameDayConfirmationSuccess(sameDayConfirmation));
          dispatch(asyncChainFinish());
          dispatch(FlowStatusActions.setFlowStatus('sameDay', STATUS.COMPLETED));
          history.push(sameDayRoutes.confirmation);
        })
        .catch((error) => {
          const { responseJSON } = error ?? {};
          const isApplePay = get(sameDayConfirmationRequestLink, 'body.payment.newCreditCard.digitalPaymentType') === APPLE_PAY.key;

          dispatch(asyncChainFinish());

          if (responseJSON) {
            const [experienceId, requestId] = splitRequestIdIntoTokens(responseJSON.requestId);

            fireTrack('squid', {
              error_code: responseJSON.message,
              error_trackingcode: responseJSON.code,
              global_experienceid: experienceId,
              global_requestid: requestId,
              page_description: 'error message'
            });
          }

          if (isApplePay) {
            sendErrorLog(toChapiAfpErrorLog(error, PAYMENT_METHODS.APPLE_PAY));

            if (!CEPTOR_VOID_API || !isSessionTimeoutError(error)) {
              dispatch(initiateVoidTransaction(PAYMENT_METHODS.APPLE_PAY, error));
            }
          }

          if (responseJSON?.code === ERROR_SAME_DAY_LOGIN_MISMATCH) {
            dispatch(_handleSameDayAccountMismatchError(error));
          }

          if (isWebView && cancelStandbyListing) {
            dispatch(cancelStandbyListingAndBackToPreviousPage(cancelStandbyListing));
          }

          dispatch(updateSameDayConfirmationFailed(error));
          errorHandler && errorHandler();

          return error;
        });
    };

export const updateSameDayConfirmationRefundMethod =
  (
    formData: FormData,
    sameDayConfirmationRefundRequest: SameDayConfirmationRefundRequest,
    isLoggedIn: boolean = false
  ) => (dispatch: ThunkDispatch) => {
    dispatch(updateSameDayConfirmationRefund());
    dispatch(asyncChainStart(getAsyncChainMessages()));

    return sameDayApi.updateSameDayConfirmationRefund(sameDayConfirmationRefundRequest, isLoggedIn, formData)
      .then(({ sameDayRefundPage }) => {
        dispatch(FlowStatusActions.setFlowStatus('sameDay', STATUS.IN_PROGRESS));

        if (sameDayRefundPage?.showRefundPage) {
          dispatch(updateSameDayConfirmationRefundSuccess(sameDayRefundPage));
          dispatch(asyncChainFinish());
          history.push('/same-day/refund-method');
        } else {
          const { cancelStandbyListing, sameDayConfirmation } = sameDayRefundPage?._links ?? {};

          dispatch(updateSameDayConfirmationMethod(isLoggedIn, formData, sameDayConfirmation, cancelStandbyListing, null, true));
        }
      })
      .catch((error) => {
        dispatch(asyncChainFinish()); 

        if (error?.responseJSON?.code === ERROR_SAME_DAY_LOGIN_MISMATCH) {
          dispatch(_handleSameDayAccountMismatchError(error));
        }
        dispatch(updateSameDayConfirmationRefundFailed(error));
      });
  };

export const retrieveCancelStandbyListingMethod =
  (sameDayCancellation: SameDayCancellation, isBackNavCancel?: boolean) => (dispatch: *) => {
    dispatch(updateSameDayCancellation());

    return sameDayApi.retrieveCancelStandbyListing(sameDayCancellation)
      .then(({ cancelStandbyListingPage }) => {
        dispatch(updateSameDayCancellationSuccess(cancelStandbyListingPage));
        dispatch(FlowStatusActions.setFlowStatus('standby', STATUS.COMPLETED));
        !isBackNavCancel && history.push(sameDayRoutes.cancel);
      })
      .catch((error) => dispatch(updateSameDayCancellationFailed(error)));
  };

export const retrieveSameDayFlightDetailsInformation =
  (sameDayFlightDetailsRequest: SameDayFlightDetailsRequest) => (dispatch: ReduxDispatch<*>) => {
    dispatch(fetchSameDayFlightDetailsInfo());

    return (
      sameDayFlightDetailsRequest &&
      sameDayApi.retrieveSameDayFlightDetails(sameDayFlightDetailsRequest)
        .then(({ sameDayFlightDetails }) => {
          sameDayFlightDetails &&
            dispatch(
              fetchSameDayFlightDetailsInfoSuccess({
                sameDayFlightDetails,
                flightIdentifier: sameDayFlightDetailsRequest?.body?.flightIdentifier
              })
            );
        })
        .catch((error) => dispatch(fetchSameDayFlightDetailsInfoFailed(error)))
    );
  };

export const retrieveSameDayPurchaseConfirmationPlacement = (contactMethod: string) => (dispatch: ThunkDispatch) => {
  dispatch(fetchConfirmationPagePlacements());

  return dispatch(getPlacements(SAME_DAY_STANDBY_CONFIRMATION_PAGE_ID, [contactMethod]))
    .then((content) => dispatch(fetchConfirmationPagePlacementsSuccess(content)))
    .catch(() => dispatch(fetchConfirmationPagePlacementsFailed()));
};

export const saveChangeFlow = (changeFlow: boolean) => ({
  type: SAME_DAY__SAVE_CHANGE_FLOW,
  isChangeFlow: changeFlow
});

export const selectFare = (selectedFlight: FlightProductCard, changeFlow?: boolean) => (dispatch: ReduxDispatch<*>) => {
  dispatch(saveSelectedFlight(selectedFlight));
  changeFlow && dispatch(saveChangeFlow(changeFlow));
  dispatch(push(`${sameDayRoutes.shopping}/select-fare`));
};

const savePaymentInfo = (paymentInfo: PaymentInfo) => ({
  type: SAME_DAY__SAVE_PAYMENT_INFO,
  paymentInfo
});

export const resetSameDayFlowData = () => ({
  type: SAME_DAY__RESET_FLOW_DATA
});

export const resetSameDayPaymentInfo = () => ({
  type: SAME_DAY__RESET_PAYMENT_INFO
});

export const resetSameDayPaymentData = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(resetSameDayPaymentInfo());
  dispatch(resetAlternativeFormsOfPayment());
  dispatch(resetSavedCreditCards());
};

export const initiateSameDayVoidTransactionForGuest = () => (dispatch: ThunkDispatch, getState: () => *) => {
  const {
    applePay: { applePayCard } = {},
    toggles: { CEPTOR_VOID_API } = {}
  } = getState()?.app ?? {};

  if (CEPTOR_VOID_API && !isEmpty(applePayCard)) {
    dispatch(initiateVoidTransaction(PAYMENT_METHODS.APPLE_PAY, null, true, 'user continued as guest'));
  }
};

export const savePaymentInfoAndGoToReviewPage = (paymentInfo: PaymentInfo) => (dispatch: ReduxDispatch<*>) => {
  dispatch(savePaymentInfo(paymentInfo));
  dispatch(goBack());
  dispatch(FormDataActions.updateFormFieldDataValue(SAME_DAY_REVIEW_FORM, 'securityCode', ''));
};

const saveSelectedFlight = (selectedFlight: FlightProductCard) => ({
  type: SAME_DAY__SAVE_SELECTED_FLIGHT,
  selectedFlight
});

export const cancelStandbyListingAndBackToPreviousPage =
  (sameDayCancellation: SameDayCancellation) => (dispatch: ThunkDispatch) => {
    dispatch(retrieveCancelStandbyListingMethod(sameDayCancellation, true));
    history.replace(sameDayRoutes.review);
  };
