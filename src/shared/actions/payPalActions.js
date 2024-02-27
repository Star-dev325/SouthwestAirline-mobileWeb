// @flow
import _ from 'lodash';
import store2 from 'store2';

import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import PayPalActionTypes, { apiActionCreator } from 'src/shared/actions/payPalActionTypes';
import * as PayPalApi from 'src/shared/api/payPalApi';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';
import URLS from 'src/shared/bootstrap/urls';
import StorageKeys from 'src/shared/helpers/storageKeys';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { PayPalSignInRequestType } from 'src/shared/flow-typed/shared.types';

const { PAYPAL__CREATE_PAYPAL_TOKEN } = PayPalActionTypes;

export const { createPaypalToken, createPaypalTokenSuccess, createPaypalTokenFailed } =
  apiActionCreator(PAYPAL__CREATE_PAYPAL_TOKEN);

export const gotoPayPalSignIn =
  (signInRequest: PayPalSignInRequestType, state: *, options: *, isLoggedIn: boolean) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      const { tokenRequest } = signInRequest;

      dispatch(createPaypalToken(tokenRequest));
      store2.session.remove(StorageKeys.PAYPAL_DATA_KEY);

      return PayPalApi.createPayPalToken(tokenRequest, isLoggedIn)
        .then((createResponse) => {
          dispatch(createPaypalTokenSuccess(createResponse));

          const resumeData = {
            options,
            state
          };

          const {
            merchantToken: { token }
          } = createResponse;

          _.set(resumeData, 'options.payPal.token', token);

          const analyticsStores = _.get(window, 'data_a.stores');

          _.set(resumeData, 'analytics.stores', analyticsStores);

          store2.session(StorageKeys.PAYPAL_DATA_KEY, resumeData);

          // TODO: Improve bootstrap implementation in MOB-118603
          const { paypalUrl } = URLS;
          const target = buildPathWithParamAndQuery(paypalUrl, null, { token });

          wcmTransitionTo({ linkType: WcmLinkTypes.WEB_VIEW, target });
        })
        .catch((error) => dispatch(createPaypalTokenFailed(error)));
    };

export const resumeAppState = (state: { app: * }) => ({
  type: PayPalActionTypes.PAYPAL__RESUME_APP_STATE,
  payload: {
    state
  }
});
