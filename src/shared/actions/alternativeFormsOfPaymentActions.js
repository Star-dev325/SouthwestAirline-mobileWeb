// @flow
import _ from 'lodash';
import { fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import AlternativeFormsOfPaymentActionTypes, {
  apiActionCreator
} from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import { showErrorPopUp } from 'src/shared/actions/sharedActions';
import { sendErrorLog, sendInfoLog } from 'src/shared/api/loggingApi';
import { EXTERNAL_PAYMENT_PAGE_URL, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';
import AlternativeFormsOfPaymentError from 'src/shared/errors/alternativeFormsOfPaymentError';
import {
  getAmountFromTotal,
  getAvailabilityForPaymentMethod,
  getQueryParamsForExternalPaymentPage,
  getTotalFromAmount,
  getValidationErrors,
  validatePaymentMethodIsAvailable
} from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import CeptorWrapper from 'src/shared/helpers/ceptorWrapper';
import { containsApiErrorCodes } from 'src/shared/helpers/errorCodesHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import StorageKeys from 'src/shared/helpers/storageKeys';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import { showNativeApplePay } from 'src/shared/helpers/webViewHelper';
import { getMoneyTotalForApplication } from 'src/shared/selectors/alternativeFormsOfPaymentSelector';
import { getCurrentAppFlow } from 'src/shared/selectors/appSelector';
import {
  toAfpAvailabilities,
  toChapiAfpErrorLog,
  toGetUatpCardRequest,
  toInfoLog,
  toRequestedAFPParams,
  toUpdateRequest
} from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import store2 from 'store2';

import type { Dispatch as ReduxDispatch } from 'redux';
import type {
  AfpAvailability,
  ApiErrorType,
  CeptorCallback,
  CeptorConfig,
  CeptorConfigWithAmount,
  CeptorValidationCallback,
  CeptorValidationResponse,
  Dispatch as ThunkDispatch
} from 'src/shared/flow-typed/shared.types';

const { fetchAvailability, fetchAvailabilitySuccess, fetchAvailabilityFailed } = apiActionCreator(
  AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY,
  { isSpinnerNeeded: false }
);

const fetchAlternativeFormsOfPayment =
  (
    ceptorConfig: CeptorConfigWithAmount,
    callbackFn: CeptorCallback,
    validationFn: CeptorValidationCallback,
    shouldHideError: boolean
  ) =>
    (dispatch: ReduxDispatch<*>, getState: () => *) => {
      dispatch(fetchAvailability());

      const state = _.cloneDeep(getState());
      const errorAfpCodesToDisplay = _.get(state, 'app.wcmContent.applicationProperties.ERROR_AFP_CODES_TO_DISPLAY');

      try {
        const config = { ...ceptorConfig, validationFn };
        const wrapper = CeptorWrapper.createInstance(config);

        return wrapper
          .getAvailablePaymentMethods(callbackFn)
          .then((response) => {
            const availabilities = toAfpAvailabilities(response, errorAfpCodesToDisplay);
            const anyAvailable = _.find(availabilities, 'isAvailable');

            anyAvailable && wrapper.setupAvailablePaymentMethods(callbackFn);

            dispatch(fetchAvailabilitySuccess(availabilities));
          })
          .catch((error) => dispatch(fetchAvailabilityFailed(shouldHideError ? undefined : error)));
      } catch (error) {
        return Promise.reject(dispatch(fetchAvailabilityFailed(shouldHideError ? undefined : error)));
      }
    };

const { updateAvailability, updateAvailabilitySuccess, updateAvailabilityFailed } = apiActionCreator(
  AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY
);

export const updateAlternativeFormsOfPayment =
  (ceptorConfig: CeptorConfigWithAmount, shouldHideError: boolean) =>
    (dispatch: ReduxDispatch<*>, getState: () => *) => {
      const wrapper = CeptorWrapper.getInstance();
      const request = toUpdateRequest(ceptorConfig);
      const state = _.cloneDeep(getState());
      const errorAfpCodesToDisplay = _.get(state, 'app.wcmContent.applicationProperties.ERROR_AFP_CODES_TO_DISPLAY');

      dispatch(updateAvailability());

      try {
        wrapper
          .update(request, true)
          .then((response) => {
            const availabilities = toAfpAvailabilities(response, errorAfpCodesToDisplay);

            dispatch(updateAvailabilitySuccess(availabilities));
          })
          .catch((error) => dispatch(updateAvailabilityFailed(shouldHideError ? undefined : error)));
      } catch (error) {
        dispatch(updateAvailabilityFailed(shouldHideError ? undefined : error));
      }
    };

export const setUpAlternativeFormsOfPayment =
  (
    paymentMethodAvailabilities: Array<AfpAvailability>,
    ceptorConfig: CeptorConfigWithAmount,
    callbackFn: CeptorCallback,
    validationFn: CeptorValidationCallback,
    shouldHideError: boolean = true
  ) =>
    (dispatch: ThunkDispatch) => {
      const amount = _.get(ceptorConfig, 'requestedAFPParams.amount');

      if (!amount) {
        return;
      }

      const allPaymentMethodsAvailable = _.every(paymentMethodAvailabilities, 'isAvailable');

      allPaymentMethodsAvailable
        ? dispatch(updateAlternativeFormsOfPayment(ceptorConfig, shouldHideError))
        : dispatch(fetchAlternativeFormsOfPayment(ceptorConfig, callbackFn, validationFn, shouldHideError));
    };

export const resetAlternativeFormsOfPayment = () => {
  store2.session.remove(StorageKeys.CEPTOR_PERSISTENCE_IDENTIFIER);

  return {
    type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
  };
};

export const { initiatePayment, initiatePaymentSuccess, initiatePaymentFailed } = apiActionCreator(
  AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT,
  { isSpinnerNeeded: false }
);

export const initiateAlternativeFormOfPayment =
  (
    afpAvailability: AfpAvailability,
    ceptorConfig: CeptorConfigWithAmount,
    paymentMethod: string,
    isWebView: boolean,
    shouldShowUplift: ?boolean,
    shouldDisableUplift: ?boolean,
    errorHandler: *
  ) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      const wrapper = CeptorWrapper.getInstance();
      const {
        requestedAFPParams: { amount }
      } = ceptorConfig;
      const moneyTotal = getTotalFromAmount(amount);
      const request = toGetUatpCardRequest(ceptorConfig, paymentMethod, amount);
      const state = _.cloneDeep(getState());
      const location = _.get(state, 'router.location');

      dispatch(initiatePayment());

      if (isWebView && paymentMethod === PAYMENT_METHODS.APPLE_PAY) {
        return showNativeApplePay(moneyTotal);
      }

      if (paymentMethod === PAYMENT_METHODS.UPLIFT) {
        const upliftAvailability = _.get(state, 'app.uplift.upliftAvailability');

        if (validatePaymentMethodIsAvailable(paymentMethod, upliftAvailability, shouldShowUplift, shouldDisableUplift)) {
          const queryParams = getQueryParamsForExternalPaymentPage(paymentMethod, ceptorConfig, location, isWebView);
          const target = buildPathWithParamAndQuery(EXTERNAL_PAYMENT_PAGE_URL, null, { ...queryParams });

          return wcmTransitionTo({ linkType: WcmLinkTypes.BROWSER, target, useWebViewLinkType: !isWebView });
        } else {
          return dispatch(initiatePaymentFailed(new AlternativeFormsOfPaymentError(errorHandler)));
        }
      }

      try {
        afpAvailability.lastUpdateFailed || !afpAvailability.isAvailable || !afpAvailability.shouldDisplay
          ? dispatch(initiatePaymentFailed(new AlternativeFormsOfPaymentError(errorHandler)))
          : wrapper.getUatpCard(request);
      } catch (error) {
        dispatch(initiatePaymentFailed(new AlternativeFormsOfPaymentError(errorHandler)));
      }
    };

export const initiateVoidTransaction =
  (paymentMethod: string, error: ?ApiErrorType, shouldVoidTransaction: boolean = false, voidReason?: string) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      const state = _.cloneDeep(getState());
      const CEPTOR_VOID_API: boolean = state?.app?.toggles?.CEPTOR_VOID_API;

      if (!CEPTOR_VOID_API && error) {
        dispatch(showErrorPopUp(error));
      } else {
        const isWebView = state?.app?.webView?.isWebView;
        const wrapper = CeptorWrapper.getInstance();
        const errorCodeMap = fetchBootstrapData(BootstrapConstants.ERROR_CODE_MAP_PATH, {});
        const isApplePayErrorCode = error
          ? containsApiErrorCodes(error, Object.keys(errorCodeMap.applePayErrorCodes).map(Number))
          : false;

        if (paymentMethod === PAYMENT_METHODS.APPLE_PAY && (isApplePayErrorCode || shouldVoidTransaction)) {
          const cardNumber = isWebView
            ? state?.app?.applePay?.applePayCard?.purchaseRequest?.newCreditCard?.cardNumber
            : state?.app?.applePay?.applePayCard?.token?.number;
          const baseCeptorConfig = state?.app?.wcmContent?.applicationProperties?.ceptorConfig;
          const applicationType = getCurrentAppFlow(state);
          const moneyTotal = getMoneyTotalForApplication(state, applicationType ?? '');
          const amount = moneyTotal ? getAmountFromTotal(moneyTotal) : 0;
          const {
            requestedAFPParams: { paymentMethodConfigParams }
          } = baseCeptorConfig;
          const paymentMethodConfigParam = paymentMethodConfigParams.find(
            (param) => param.paymentMethod === PAYMENT_METHODS.APPLE_PAY
          );
          const voidConfig = {
            config: {
              amount: amount,
              cardNumber: cardNumber
            },
            paymentMethod: paymentMethod,
            provider: paymentMethodConfigParam.provider
          };

          const logInfoDetails = {
            amount,
            applicationType,
            digitalTransactionId: state?.app?.applePay?.applePayCard?.token?.digitalTransactionId,
            isApplePayErrorCode,
            isWebView,
            lastFourDigits: state?.app?.applePay?.applePayCard?.token?.lastFourDigits,
            lastFourDigitsNumber: cardNumber ? cardNumber.slice(-4) : null,
            paymentMethod: PAYMENT_METHODS.APPLE_PAY,
            voidReason: voidReason ? voidReason : error
          };

          sendInfoLog(toInfoLog({ ...logInfoDetails, 'message': 'VoidTransactionBegin' }));

          try {
            return wrapper.voidTransaction(voidConfig)
              .then((response) => {
                sendInfoLog(toInfoLog({ ...response, 'message': 'VoidTransactionResponse' }));

                error && dispatch(showErrorPopUp(error));
              });
          } catch (err) {
            sendErrorLog(toChapiAfpErrorLog(err, PAYMENT_METHODS.APPLE_PAY));
            sendInfoLog(toInfoLog({ ...logInfoDetails, 'message': 'VoidTransactionFailure' }));
            error && dispatch(showErrorPopUp(error));

            return Promise.reject(err);
          }
        } else {
          error && dispatch(showErrorPopUp(error));
        }
      }
    };

export const saveFormData = (formData: *) => (dispatch: ThunkDispatch) =>
  Promise.resolve(
    dispatch({
      type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__SAVE_FORM_DATA,
      formData
    })
  );

export const validateAlternativeFormsOfPayment = (response: CeptorValidationResponse) => () => {
  const wrapper = CeptorWrapper.getInstance();
  const { validationPossible, paymentParameters } = response || {};

  const errors = validationPossible ? getValidationErrors(paymentParameters) : [];

  wrapper.validationErrors(errors);
};

export const alternativeFormsOfPaymentFailed = (error?: *) =>
  _.omitBy(
    {
      type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED,
      error
    },
    _.isUndefined
  );

const { retrieveParams, retrieveParamsSuccess, retrieveParamsFailed } = apiActionCreator(
  AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS,
  { isSpinnerNeeded: false }
);

export const retrieveAFPParams =
  (ceptorConfig: CeptorConfig, provider: string, paymentMethod: string, persistenceIdentifier: string) =>
    (dispatch: ThunkDispatch) => {
      dispatch(retrieveParams());

      const wrapper = CeptorWrapper.createBaseInstance(ceptorConfig);

      return wrapper
        .retrieveParams(provider, paymentMethod, persistenceIdentifier)
        .then((response) => {
          const requestedAFPParams = toRequestedAFPParams(response);

          dispatch(retrieveParamsSuccess(requestedAFPParams));
        })
        .catch((error) => {
          dispatch(retrieveParamsFailed(error));
          throw error;
        });
    };

export const selectAlternativeFormOfPayment = (provider: string, paymentMethod: string) => (): Promise<*> => {
  const wrapper = CeptorWrapper.getInstance();

  return new Promise((resolve, reject) => {
    try {
      wrapper.select({ paymentMethod, provider });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const { reloadAndSubmit, reloadAndSubmitSuccess, reloadAndSubmitFailed } = apiActionCreator(
  AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT
);

export const reloadAndSubmitAlternativeFormOfPayment =
  (paymentMethod: string, ceptorConfig: CeptorConfigWithAmount, callbackFn: CeptorCallback, errorHandler: *) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      dispatch(reloadAndSubmit());

      const {
        requestedAFPParams: { amount }
      } = ceptorConfig;
      const request = toGetUatpCardRequest(ceptorConfig, paymentMethod, amount);

      dispatch(fetchAlternativeFormsOfPayment(ceptorConfig, callbackFn, _.noop, true))
        .then(() => {
          const state = _.cloneDeep(getState());
          const afpAvailability = getAvailabilityForPaymentMethod(state, paymentMethod);

          if (afpAvailability.lastUpdateFailed || !afpAvailability.isAvailable || !afpAvailability.shouldDisplay) {
            dispatch(reloadAndSubmitFailed(new AlternativeFormsOfPaymentError(errorHandler)));
          } else {
            const wrapper = CeptorWrapper.getInstance();

            wrapper.getUatpCard(request);
          }
        })
        .catch(() => dispatch(reloadAndSubmitFailed(new AlternativeFormsOfPaymentError(errorHandler))));
    };

const { confirm, confirmSuccess, confirmFailed } = apiActionCreator(
  AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__CONFIRM,
  { isSpinnerNeeded: false }
);

export const confirmAlternativeFormOfPayment = (confirmationNumber: string) => (dispatch: ThunkDispatch) => {
  dispatch(confirm());

  try {
    const wrapper = CeptorWrapper.getInstance();

    wrapper.confirm(confirmationNumber);

    store2.session.remove(StorageKeys.CEPTOR_PERSISTENCE_IDENTIFIER);
    dispatch(confirmSuccess());
  } catch (error) {
    dispatch(confirmFailed());
  }
};

const { sendError, sendErrorSuccess, sendErrorFailed } = apiActionCreator(
  AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__SEND_ERROR,
  { isSpinnerNeeded: false }
);

export const sendAlternativeFormOfPaymentError = (errorMessage: string) => (dispatch: ThunkDispatch) => {
  dispatch(sendError());

  try {
    const wrapper = CeptorWrapper.getInstance();

    wrapper.error(errorMessage);

    dispatch(sendErrorSuccess());
  } catch (error) {
    dispatch(sendErrorFailed());
  }
};
