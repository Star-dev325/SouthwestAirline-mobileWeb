// @flow
import _ from 'lodash';

import {
  retrieveAFPParams,
  selectAlternativeFormOfPayment,
  setUpAlternativeFormsOfPayment,
  updateAlternativeFormsOfPayment
} from 'src/shared/actions/alternativeFormsOfPaymentActions';
import ExternalPaymentActionTypes, { apiActionCreator } from 'src/externalPayment/actions/externalPaymentActionTypes';

import type {
  AfpAvailability,
  CeptorAFPConfigWithAmount,
  CeptorCallback,
  CeptorCallbackResponse,
  CeptorConfig,
  Dispatch as ThunkDispatch
} from 'src/shared/flow-typed/shared.types';

const { setUpExternalPayment, setUpExternalPaymentSuccess, setUpExternalPaymentFailed } = apiActionCreator(
  ExternalPaymentActionTypes.EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT
);

export const setUpExternalPaymentPage =
  (
    ceptorConfig: CeptorConfig,
    paymentMethodAvailabilities: Array<AfpAvailability>,
    provider: string,
    paymentMethod: string,
    persistenceIdentifier: string,
    callbackFn: CeptorCallback
  ) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      dispatch(setUpExternalPayment());

      return dispatch(retrieveAFPParams(ceptorConfig, provider, paymentMethod, persistenceIdentifier))
        .then(() => {
          const state = _.cloneDeep(getState());
          const requestedAFPParams = _.get(state, 'app.externalPayment.requestedAFPParams');
          const ceptorConfigWithParams = {
            ceptorConfigParams: ceptorConfig.ceptorConfigParams,
            requestedAFPParams
          };

          dispatch(
            setUpAlternativeFormsOfPayment(paymentMethodAvailabilities, ceptorConfigWithParams, callbackFn, _.noop, false)
          );
          dispatch(setUpExternalPaymentSuccess());
        })
        .catch(() => dispatch(setUpExternalPaymentFailed()));
    };

const { initiateExternalPayment, initiateExternalPaymentSuccess, initiateExternalPaymentFailed } = apiActionCreator(
  ExternalPaymentActionTypes.EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT
);

export const initiateExternalPaymentMethod =
  (
    ceptorConfig: CeptorConfig,
    requestedAFPParams: CeptorAFPConfigWithAmount,
    provider: string,
    paymentMethod: string
  ) =>
    (dispatch: ThunkDispatch) => {
      dispatch(initiateExternalPayment());

      return dispatch(selectAlternativeFormOfPayment(provider, paymentMethod))
        .then(() => {
          const ceptorConfigWithParams = {
            ceptorConfigParams: ceptorConfig.ceptorConfigParams,
            requestedAFPParams
          };

          dispatch(updateAlternativeFormsOfPayment(ceptorConfigWithParams, true));
          dispatch(initiateExternalPaymentSuccess());
        })
        .catch((error) => dispatch(initiateExternalPaymentFailed(error)));
    };

export const completeExternalPayment = (response: CeptorCallbackResponse) => ({
  type: ExternalPaymentActionTypes.EXTERNAL_PAYMENT__COMPLETE_EXTERNAL_PAYMENT,
  response
});

export const setDisplayButton = (shouldDisplayButton: boolean) => ({
  type: ExternalPaymentActionTypes.EXTERNAL_PAYMENT__SET_DISPLAY_BUTTON,
  shouldDisplayButton
});
