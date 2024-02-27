// @flow
import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';

export const retrieveReservation = (requestObject: Link, isLoggedIn: boolean) => {
  const { method, query, href, body } = requestObject;

  const path = removeInitialForwardSlash(href);
  const request = {
    url: url.resolve(environment.chapiAirBooking, path),
    type: method,
    contentType: 'application/json',
    dataType: 'json'
  };

  return method === 'POST'
    ? restClient.ajax({ ...request, body }, isLoggedIn)
    : restClient.ajax({ ...request, query }, isLoggedIn);
};

export const purchase = (link: Link, isLoggedin: boolean) => {
  const { href, xhref, body, method } = link;

  return restClient.ajax(
    {
      url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(isLoggedin ? xhref : href)),
      type: method,
      dataType: 'json',
      contentType: 'application/json',
      body
    },
    isLoggedin
  );
};
