// @flow
import i18n from '@swa-ui/locale';
import { goBack, push } from 'connected-react-router';
import _ from 'lodash';
import { transformToEarlyBirdPriceSubTotal } from 'src/earlyBird/transformers/earlyBirdPriceSubTotalTransformer';
import {
  filterSelectedPassengersFromEarlyBirdBounds,
  generateEarlyBirdPurchaseRequestLink
} from 'src/earlyBird/transformers/earlyBirdPurchaseReviewTransformer';
import { getMboxConfig, getSegments, getTargetParams } from 'src/shared/actions/adobeTargetActions';
import {
  initiateVoidTransaction, resetAlternativeFormsOfPayment
} from 'src/shared/actions/alternativeFormsOfPaymentActions';
import { setSavedCC } from 'src/shared/actions/creditCardActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { updateFormFieldDataValue } from 'src/shared/actions/formDataActions';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as EarlyBirdAPI from 'src/shared/api/earlyBirdApi';
import { addCurrency } from 'src/shared/api/helpers/currencyHelper';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';
import { ANALYTICS_DATA } from 'src/shared/constants/earlyBirdInPathConstants';
import { STATUS } from 'src/shared/constants/flowConstants';
import { EARLY_BIRD_CHECK_IN_FORM, EARLY_BIRD_REVIEW_FORM } from 'src/shared/constants/formIds';
import { isSessionTimeoutError } from 'src/shared/helpers/errorCodesHelper';
import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { toChapiAfpErrorLog } from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import { getPlacements } from 'src/wcm/actions/wcmActions';
import { EARLY_BIRD_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import store2 from 'store2';

import type { Dispatch as ReduxDispatch } from 'redux';
import earlyBirdActionTypes, { apiActionCreator } from 'src/earlyBird/actions/earlyBirdActionTypes';
import type { EarlyBirdPriceResponseType, EarlyBirdPurchaseType } from 'src/earlyBird/flow-typed/earlyBird.types';
import type { Dispatch as ThunkDispatch, PassengerNameRecord, PaymentInfo } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

const {
  EARLY_BIRD__FETCH_RESERVATION,
  EARLY_BIRD__FETCH_PURCHASE,
  EARLY_BIRD__FETCH_PAYMENT_OPTIONS,
  EARLY_BIRD__SAVE_PAYMENT_INFO,
  EARLY_BIRD__RESET_FLOW_DATA,
  EARLY_BIRD__RESET_PAYMENT_INFO,
  EARLY_BIRD__SAVE_REVIEW_PAGE_DATA,
  EARLY_BIRD__FETCH_EARLYBIRD_BANNER_PLACEMENTS
} = earlyBirdActionTypes;

const startNewEarlyBirdFlow = (pnr: PassengerNameRecord) => (dispatch: *) => {
  let destinationUrl = getNormalizedRoute({ routeName: 'index' });

  dispatch(FlowStatusActions.setFlowStatus('earlyBird', STATUS.INITIAL));
  dispatch(saveFailedEarlyBirdReservation(pnr));

  destinationUrl = buildPathWithParamAndQuery(destinationUrl, null, {
    clearFormData: false
  });

  return dispatch(hideDialog()).then(() => {
    dispatch(push(destinationUrl));
  });
};

const { fetchEarlybirdBannerPlacements, fetchEarlybirdBannerPlacementsSuccess, fetchEarlybirdBannerPlacementsFailed } = apiActionCreator(EARLY_BIRD__FETCH_EARLYBIRD_BANNER_PLACEMENTS);

export const fetchEarlyBirdPlacements = () => (dispatch: ThunkDispatch): Promise<*> => {
  dispatch(fetchEarlybirdBannerPlacements());

  return dispatch(getTargetParams({}, EARLY_BIRD_PAGE_ID))
    .then((params) => dispatch(getMboxConfig(EARLY_BIRD_PAGE_ID, params, [])))
    .then((config) => dispatch(getSegments(config)))
    .then((segments) => dispatch(getPlacements(EARLY_BIRD_PAGE_ID, [], segments)))
    .then((content) => dispatch(fetchEarlybirdBannerPlacementsSuccess(content)))
    .catch((error) => dispatch(fetchEarlybirdBannerPlacementsFailed(error)));
};

export const showEarlybirdFailedDialog = (failedEarlyBird: PassengerNameRecord) => (dispatch: *) => {
  dispatch(
    showDialog({
      name: 'early-bird-in-path-purchase-failed',
      title: i18n('SHARED__EARLY_BIRD__PURCHASE_EARLY_BIRD_CHECK_IN_TITLE'),
      message: i18n('SHARED__EARLY_BIRD__PURCHASE_EARLY_BIRD_CHECK_IN_MESSAGE'),
      buttons: [
        {
          dataAnalytics: ANALYTICS_DATA.ADD_EB_LATER,
          label: i18n('SHARED__EARLY_BIRD__PURCHASE_EARLY_BIRD_CHECK_IN_MAYBE_LATER'),
          onClick: () => dispatch(hideDialog())
        },
        {
          dataAnalytics: ANALYTICS_DATA.ADD_EB_NOW,
          label: i18n('SHARED__EARLY_BIRD__PURCHASE_EARLY_BIRD_CHECK_IN_ADD_EARLY_BIRD'),
          onClick: () => dispatch(startNewEarlyBirdFlow(failedEarlyBird))
        }
      ]
    })
  );
};

export const { fetchReservation, fetchReservationSuccess, fetchReservationFailed } =
  apiActionCreator(EARLY_BIRD__FETCH_RESERVATION);

export const getEarlyBirdReservation = (link: Link, recordLocator: string, isLoggedIn: boolean) => {
  store2.session.remove(StorageKeys.PAYPAL_DATA_KEY);

  return (dispatch: *) => {
    dispatch(resetAlternativeFormsOfPayment());
    dispatch(fetchReservation());

    return EarlyBirdAPI.retrieveReservation(link, isLoggedIn)
      .then(({ viewEarlyBirdReservationPage }) => {
        const checkinRoute = getNormalizedRoute({ routeName: 'checkin' });

        if (_.isEmpty(viewEarlyBirdReservationPage.earlyBirdBounds)) {
          throw new Error(i18n('EARLY_BIRD_INELIGIBLE'));
        }

        dispatch(resetEarlyBirdFlowData());
        dispatch(fetchReservationSuccess(viewEarlyBirdReservationPage));
        dispatch(FlowStatusActions.setFlowStatus('earlyBird', STATUS.IN_PROGRESS));
        dispatch(push(buildPathWithParamAndQuery(checkinRoute, { pnr: recordLocator }, null)));
      })
      .catch((err) => dispatch(fetchReservationFailed(err)));
  };
};

const saveFailedEarlyBirdReservation = (pnr: PassengerNameRecord) => {
  const { recordLocator, firstName, lastName } = pnr;

  return (dispatch: *) => {
    dispatch(updateFormFieldDataValue(EARLY_BIRD_CHECK_IN_FORM, 'recordLocator', recordLocator));
    dispatch(updateFormFieldDataValue(EARLY_BIRD_CHECK_IN_FORM, 'firstName', firstName));
    dispatch(updateFormFieldDataValue(EARLY_BIRD_CHECK_IN_FORM, 'lastName', lastName));
  };
};

const { fetchPaymentOptions, fetchPaymentOptionsSuccess, fetchPaymentOptionsFailed } = apiActionCreator(
  EARLY_BIRD__FETCH_PAYMENT_OPTIONS
);

export const getPaymentOptions = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(fetchPaymentOptions());

  return AccountsApi.fetchPaymentOptions()
    .then(({ paymentSavedCreditCardsPage }) => {
      dispatch(setSavedCC(paymentSavedCreditCardsPage));
      dispatch(fetchPaymentOptionsSuccess(paymentSavedCreditCardsPage));
    })
    .catch((err) => {
      dispatch(fetchPaymentOptionsFailed(err));
      throw err;
    });
};

export const gotoReviewPage =
  (nextPagePath: string, isLoggedIn: boolean, formData: FormData, priceResponse: EarlyBirdPriceResponseType) =>
    (dispatch: *) => {
      if (!isLoggedIn) {
        dispatch(generateDataForReviewPage(formData, priceResponse));

        return dispatch(push(nextPagePath));
      } else {
        return dispatch(getPaymentOptions()).then(() => {
          dispatch(generateDataForReviewPage(formData, priceResponse));
          dispatch(push(nextPagePath));
        });
      }
    };

export const savePaymentInfoAndBackToPreviousPage = (paymentInfo: PaymentInfo) => (dispatch: ReduxDispatch<*>) => {
  dispatch(savePaymentInfo(paymentInfo));
  dispatch(goBack());
  dispatch(FormDataActions.updateFormFieldDataValue(EARLY_BIRD_REVIEW_FORM, 'securityCode', ''));
};

const savePaymentInfo = (paymentInfo: PaymentInfo) => ({
  type: EARLY_BIRD__SAVE_PAYMENT_INFO,
  paymentInfo
});

const saveReviewPageData = (reviewPage) => ({
  type: EARLY_BIRD__SAVE_REVIEW_PAGE_DATA,
  reviewPage
});

const generateDataForReviewPage =
  (formData: FormData, priceResponse: EarlyBirdPriceResponseType) => (dispatch: ReduxDispatch<*>) => {
    const { earlyBirdBounds, recordLocator, ...others } = priceResponse;
    const boundsSubTotals = transformToEarlyBirdPriceSubTotal(earlyBirdBounds, formData);
    const moneyTotalFare = addCurrency(..._.map(boundsSubTotals, 'totalBoundPrice'));
    const earlyBirdBoundsWithSelectedPassengers = filterSelectedPassengersFromEarlyBirdBounds(
      earlyBirdBounds,
      formData
    );
    // TODO - Sancho & Wang Xin - This logic is buggy if the names have spaces in them.
    // This logic has to be changed once the CHAPI provides links object for firstName and lastName in the story MOB-11481.
    const name = _.get(earlyBirdBoundsWithSelectedPassengers, '0.passengers.0.name');
    const [firstName, ...lastNames] = name.split(' ');
    const lastName = lastNames.join(' ');
    const productIds = _.chain(earlyBirdBoundsWithSelectedPassengers)
      .flatMap((bound) => bound.passengers)
      .flatMap((passenger) => passenger._meta.productId)
      .value();

    dispatch(
      saveReviewPageData({
        firstName,
        lastName,
        moneyTotalFare,
        productIds,
        recordLocator,
        earlyBirdBounds: earlyBirdBoundsWithSelectedPassengers,
        ...others
      })
    );
  };

export const { fetchPurchase, fetchPurchaseSuccess, fetchPurchaseFailed } =
  apiActionCreator(EARLY_BIRD__FETCH_PURCHASE);

export const purchase = (earlyBirdPurchase: EarlyBirdPurchaseType) => {
  const { isLoggedIn } = earlyBirdPurchase;

  return (dispatch: *, getState: *) => {
    dispatch(fetchPurchase());
    const state = getState();
    const earlyBirdRequest = generateEarlyBirdPurchaseRequestLink(earlyBirdPurchase);
    const CEPTOR_VOID_API = state?.app?.toggles?.CEPTOR_VOID_API;

    return EarlyBirdAPI.purchase(earlyBirdRequest, isLoggedIn)
      .then(({ earlyBirdConfirmationPage }) => {
        dispatch(fetchPurchaseSuccess(earlyBirdConfirmationPage));

        return earlyBirdConfirmationPage;
      })
      .then((earlyBirdConfirmationPage) => {
        const recordLocator = _.get(earlyBirdConfirmationPage, 'recordLocator');
        const confirmationRoute = getNormalizedRoute({ routeName: 'confirmation' });

        dispatch(FlowStatusActions.setFlowStatus('earlyBird', STATUS.COMPLETED));
        playHapticFeedback();
        dispatch(push(buildPathWithParamAndQuery(confirmationRoute, { pnr: recordLocator }, null)));
      })
      .catch((error) => {
        const isApplePay = _.get(earlyBirdRequest, 'body.payment.newCreditCard.digitalPaymentType') === APPLE_PAY.key;

        dispatch(FormDataActions.clearFormDataById(EARLY_BIRD_REVIEW_FORM));

        if (isApplePay) {
          sendErrorLog(toChapiAfpErrorLog(error, PAYMENT_METHODS.APPLE_PAY));

          if (!CEPTOR_VOID_API || !isSessionTimeoutError(error)) {
            dispatch(initiateVoidTransaction(PAYMENT_METHODS.APPLE_PAY, error));
          }
          dispatch(fetchPurchaseFailed());
        } else {
          dispatch(fetchPurchaseFailed(error));
        }
      });
  };
};

const resetEarlyBirdFlowData = () => ({
  type: EARLY_BIRD__RESET_FLOW_DATA
});

export const resetPaymentInfo = () => ({
  type: EARLY_BIRD__RESET_PAYMENT_INFO
});
