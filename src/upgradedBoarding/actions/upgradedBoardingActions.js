// @flow
import i18n from '@swa-ui/locale';
import { goBack, push } from 'connected-react-router';
import _ from 'lodash';
import { matchPath } from 'react-router';
import { getSegments } from 'src/shared/actions/adobeTargetActions';
import {
  initiateVoidTransaction, resetAlternativeFormsOfPayment
} from 'src/shared/actions/alternativeFormsOfPaymentActions';
import { resetSavedCreditCards } from 'src/shared/actions/creditCardActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import { exitWebView } from 'src/shared/actions/webViewActions';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import * as UpgradedBoardingApi from 'src/shared/api/upgradedBoardingApi';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';
import { UPGRADED_BOARDING_RESTART_FLOW_ERRORS } from 'src/shared/constants/errorCodes';
import { STATUS } from 'src/shared/constants/flowConstants';
import { UPGRADED_BOARDING_FORM, UPGRADED_BOARDING_PURCHASE_FORM } from 'src/shared/constants/formIds';
import { containsApiErrorCodes, isSessionTimeoutError } from 'src/shared/helpers/errorCodesHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { toChapiAfpErrorLog } from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import { generateDialogConfigFromError } from 'src/shared/transformers/dialogTransformer';
import upgradedBoardingActionTypes, {
  apiActionCreator
} from 'src/upgradedBoarding/actions/upgradedBoardingActionTypes';
import { upgradedBoardingOldRoutes, upgradedBoardingRoutes } from 'src/upgradedBoarding/constants/upgradedBoardingRoutes';
import { generateUpgradedBoardingRequestLink } from 'src/upgradedBoarding/transformers/upgradedBoardingPurchaseTransformer';
import { getPlacements } from 'src/wcm/actions/wcmActions';
import { UPGRADED_BOARDING_PAGE_ID, UPGRADED_BOARDING_PURCHASE_PAGE_ID } from 'src/wcm/constants/wcmConstants';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { CurrencyType, PaymentInfo, Dispatch as ThunkDispatch } from 'src/shared/flow-typed/shared.types';
import type { UpgradedBoardingPurchaseType } from 'src/upgradedBoarding/flow-typed/upgradedBoarding.types';

const FLOW_NAME = 'upgradedBoarding';

const {
  UPGRADED_BOARDING__CANCEL_RESERVATION,
  UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS,
  UPGRADED_BOARDING__FETCH_PURCHASE,
  UPGRADED_BOARDING__FETCH_RESERVATION,
  UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS,
  UPGRADED_BOARDING__RESET_COUNTDOWN_TIMESTAMP,
  UPGRADED_BOARDING__RESET_PAYMENT_INFO,
  UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA,
  UPGRADED_BOARDING__SAVE_COUNTDOWN_TIMESTAMP,
  UPGRADED_BOARDING__SAVE_MONEY_TOTAL,
  UPGRADED_BOARDING__SAVE_PAYMENT_INFO
} = upgradedBoardingActionTypes;

const {
  fetchUpgradedBoardingPagePlacements,
  fetchUpgradedBoardingPagePlacementsSuccess,
  fetchUpgradedBoardingPagePlacementsFailed
} = apiActionCreator(UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS);

export const loadUpgradedBoardingPagePlacements =
  () =>
    (dispatch: ThunkDispatch): Promise<*> => {
      dispatch(fetchUpgradedBoardingPagePlacements());

      return dispatch(getPlacements(UPGRADED_BOARDING_PAGE_ID, [], [], {}, true))
        .then((content) => dispatch(fetchUpgradedBoardingPagePlacementsSuccess(content)))
        .catch(() => dispatch(fetchUpgradedBoardingPagePlacementsFailed()));
    };

const { fetchPurchasePagePlacements, fetchPurchasePagePlacementsSuccess, fetchPurchasePagePlacementsFailed } =
  apiActionCreator(UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS);

export const loadPurchasePagePlacements =
  () =>
    (dispatch: ThunkDispatch): Promise<*> => {
      dispatch(fetchPurchasePagePlacements());

      return dispatch(getSegments([{ mbox: AdobeTargetConstants.UPGRADED_BOARDING_PURCHASE_PROMO_TOP_01_MBOX_ID }]))
        .then((segments) => dispatch(getPlacements(UPGRADED_BOARDING_PURCHASE_PAGE_ID, [], segments, {}, true)))
        .then((content) => dispatch(fetchPurchasePagePlacementsSuccess(content)))
        .catch(() => dispatch(fetchPurchasePagePlacementsFailed()));
    };

export const { fetchReservation, fetchReservationSuccess, fetchReservationFailed } = apiActionCreator(
  UPGRADED_BOARDING__FETCH_RESERVATION
);

export const getUpgradedBoardingReservation =
  (link: Link, shouldPushRoute: ?boolean = true) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      const state = _.cloneDeep(getState());
      const isWebView = _.get(state, 'app.webView.isWebView', false);

      dispatch(resetUpgradedBoardingFlowData());
      dispatch(resetSavedCreditCards());
      dispatch(fetchReservation());
      dispatch(resetAlternativeFormsOfPayment());

      return UpgradedBoardingApi.retrieveReservation(link)
        .then((content) => {
          dispatch(fetchReservationSuccess(content));
          dispatch(FlowStatusActions.setFlowStatus(FLOW_NAME, STATUS.IN_PROGRESS));
          
          const isEnabledUrlNormalization = state?.app?.toggles?.ENABLE_URL_NORMALIZATION;
          const upgradedBoardingPurchaseRoute = isEnabledUrlNormalization ? upgradedBoardingRoutes['upgradedBoardingPurchase'] : upgradedBoardingOldRoutes['upgradedBoardingPurchase'];
          
          shouldPushRoute && dispatch(push(upgradedBoardingPurchaseRoute));
        })
        .catch((error) => {
          const dialogConfig = generateDialogConfigFromError(error);

          if (!isWebView) {
            dispatch(fetchReservationFailed(error));
          } else {
            dispatch(
              fetchReservationFailed({
                ...error,
                errorHandler: () => dispatch(exitWebView())
              })
            );

            dispatch(FlowStatusActions.clearFlowStatus(FLOW_NAME));
            dispatch(
              showDialog({
                name: 'upgraded-boarding-error-message',
                buttons: [
                  {
                    label: i18n('SHARED__BUTTON_TEXT__OK'),
                    onClick: () => {
                      dispatch(hideDialog()).then(() => {
                        dispatch(exitWebView());
                      });
                    }
                  }
                ],
                ...dialogConfig
              })
            );
          }
        });
    };

export const savePaymentInfo = (paymentInfo: *) => ({
  type: UPGRADED_BOARDING__SAVE_PAYMENT_INFO,
  paymentInfo
});

const resetPaymentInfo = () => ({
  type: UPGRADED_BOARDING__RESET_PAYMENT_INFO
});

export const savePaymentInfoAndBackToPreviousPage = (paymentInfo: PaymentInfo) => (dispatch: ThunkDispatch) => {
  dispatch(savePaymentInfo(paymentInfo));
  dispatch(goBack());
  dispatch(FormDataActions.updateFormFieldDataValue(UPGRADED_BOARDING_PURCHASE_FORM, 'securityCode', ''));
};

export const handleCancelUpgradedBoarding = () => (dispatch: ThunkDispatch, getState: () => *) => {
  const state = _.cloneDeep(getState());
  const cancelLink = _.get(
    state,
    'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingResponse.upgradedBoardingSelectPage._links.upgradedBoardingCancel'
  );
  const pathName = _.get(state, 'router.location.pathname');
  const excludedMatchToPaths = [
    getNormalizedRoute({ routeName: 'payment' }),
    getNormalizedRoute({ routeName: 'confirmation' }),
    getNormalizedRoute({ routeName: 'upgradedBoardingPurchase' })
  ].filter((path) => path !== '/');

  const matchesExcludedPath = _.some(excludedMatchToPaths, (path) => matchPath(pathName, { path, exact: false }));

  !matchesExcludedPath && cancelLink && dispatch(cancelUpgradedBoardingReservation(cancelLink));
};

const { cancelReservation, cancelReservationSuccess, cancelReservationFailed } = apiActionCreator(
  UPGRADED_BOARDING__CANCEL_RESERVATION
);

export const cancelUpgradedBoardingReservation = (link: Link) => (dispatch: ThunkDispatch) => {
  dispatch(cancelReservation());

  dispatch(FlowStatusActions.clearFlowStatus(FLOW_NAME));

  return UpgradedBoardingApi.cancelReservation(link)
    .then(() => dispatch(cancelReservationSuccess()))
    .catch(() => dispatch(cancelReservationFailed()));
};

export const { fetchPurchase, fetchPurchaseSuccess, fetchPurchaseFailed } = apiActionCreator(
  UPGRADED_BOARDING__FETCH_PURCHASE
);

export const purchaseUpgradedBoarding =
  (upgradedBoardingPurchase: UpgradedBoardingPurchaseType, isLoggedIn: boolean) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      dispatch(fetchPurchase());

      const upgradedBoardingRequestLink = generateUpgradedBoardingRequestLink(upgradedBoardingPurchase);
      const state = _.cloneDeep(getState());
      const isWebView = _.get(state, 'app.webView.isWebView', false);
      const recordLocator = _.get(
        state,
        'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingResponse.upgradedBoardingSelectPage.recordLocator',
        ''
      );
      const CEPTOR_VOID_API = state?.app?.toggles?.CEPTOR_VOID_API;

      return UpgradedBoardingApi.purchaseUpgradedBoarding(upgradedBoardingRequestLink, isLoggedIn)
        .then((response) => {
          dispatch(fetchPurchaseSuccess(response));
          dispatch(FlowStatusActions.setFlowStatus(FLOW_NAME, STATUS.COMPLETED));
          dispatch(push(getNormalizedRoute({ routeName: 'confirmation' })));
        })
        .catch((error) => {
          const isApplePay =
          _.get(upgradedBoardingRequestLink, 'body.payment.newCreditCard.digitalPaymentType') === APPLE_PAY.key;

          if (isApplePay) {
            sendErrorLog(toChapiAfpErrorLog(error, PAYMENT_METHODS.APPLE_PAY));

            if (!CEPTOR_VOID_API || !isSessionTimeoutError(error)) {
              dispatch(initiateVoidTransaction(PAYMENT_METHODS.APPLE_PAY, error));
            }
          }

          if (containsApiErrorCodes(error, _.flatMap(UPGRADED_BOARDING_RESTART_FLOW_ERRORS))) {
            dispatch(
              fetchPurchaseFailed({
                ...error,
                errorHandler: () => {
                  if (isWebView) {
                    dispatch(WebViewActions.exitWebView());
                  } else {
                    dispatch(
                      FormDataActions.updateFormDataValue(UPGRADED_BOARDING_FORM, {
                        recordLocator,
                        firstName: '',
                        lastName: ''
                      })
                    );
                    dispatch(push(getNormalizedRoute({ routeName: 'indexWithoutClearForm' })));
                  }
                }
              })
            );
          } else {
            dispatch(fetchPurchaseFailed(error));
          }
        });
    };

export const saveMoneyTotal = (moneyTotal: CurrencyType) => ({
  type: UPGRADED_BOARDING__SAVE_MONEY_TOTAL,
  moneyTotal
});

export const saveCountdownTimeStamp = (timeStamp: Date) => ({
  type: UPGRADED_BOARDING__SAVE_COUNTDOWN_TIMESTAMP,
  timeStamp
});

export const resetCountdownTimeStamp = () => ({
  type: UPGRADED_BOARDING__RESET_COUNTDOWN_TIMESTAMP
});

export const resetUpgradedBoardingData = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(resetPaymentInfo());
  dispatch(resetAlternativeFormsOfPayment());
  dispatch(resetSavedCreditCards());
};

const resetUpgradedBoardingFlowData = () => ({
  type: UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA
});
