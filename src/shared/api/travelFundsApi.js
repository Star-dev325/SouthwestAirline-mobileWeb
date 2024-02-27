// @flow

import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';

import type {
  LookUpFundRequestType,
  ViewTravelFundLinkRequestType,
  TransferTravelFundsRequestType
} from 'src/travelFunds/flow-typed/travelFunds.types';

export const retrieveTravelFunds = (
  request: LookUpFundRequestType | ViewTravelFundLinkRequestType | TransferTravelFundsRequestType,
  auth: ?boolean = false
) =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(request.href)),
      type: request.method,
      body: request.body,
      contentType: 'application/json',
      dataType: 'json'
    },
    auth
  );
