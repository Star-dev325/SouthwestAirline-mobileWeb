// @flow
import * as restClient from 'src/shared/api/restClient';
import url from 'url';
import environment from 'src/shared/api/apiRoutes';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';

export const findFlightReaccomProducts = (requestObject: Link) => {
  const { body, href, method, query } = requestObject;

  const request = {
    contentType: 'application/json',
    dataType: 'json',
    type: method,
    url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(href))    
  };

  return method === 'POST'
    ? restClient.ajax({ ...request, body })
    : restClient.ajax({ ...request, query });
};

export const findReaccomFlightShopping = (request: Link) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(request.href)),
    type: request.method,
    body: request.body,
    contentType: 'application/json',
    dataType: 'json'
  });

export const reaccomPurchase = (request: Link, isLoggedIn: boolean) =>
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
