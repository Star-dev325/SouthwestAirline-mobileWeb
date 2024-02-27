// @flow

import url from 'url';
import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import type { PayPalTokenRequestType } from 'src/shared/flow-typed/shared.types';

export const createPayPalToken = (request: PayPalTokenRequestType, isLoggedIn: boolean) =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiAirBooking, 'v1/mobile-air-booking/feature/paypal/merchant-token'),
      type: 'POST',
      body: request,
      contentType: 'application/json',
      dataType: 'json'
    },
    isLoggedIn
  );
