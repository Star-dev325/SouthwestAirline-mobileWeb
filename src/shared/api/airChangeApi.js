import * as restClient from 'src/shared/api/restClient';
import url from 'url';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';
import environment from 'src/shared/api/apiRoutes';

export const findFlightProducts = (request) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, request.href),
    type: request.method,
    body: request.body,
    contentType: 'application/json',
    dataType: 'json'
  });

export const changePurchase = (request, isLoggedIn) => {
  const path = removeInitialForwardSlash(isLoggedIn ? request.xhref : request.href);

  return restClient.ajax(
    {
      url: url.resolve(environment.chapiAirBooking, path),
      type: request.method,
      body: request.body,
      contentType: 'application/json',
      dataType: 'json'
    },
    isLoggedIn
  );
};

export const getPricing = (request, isLoggedIn) =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(request.href)),
      type: request.method,
      body: request.body,
      contentType: 'application/json',
      dataType: 'json'
    },
    isLoggedIn
  );
