import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';

export const retrieveReservationForCancel = (request, isLoggedIn) => {
  const { href, query, method } = request;

  return restClient.ajax(
    {
      url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(href)),
      type: method,
      query,
      dataType: 'json'
    },
    isLoggedIn
  );
};

export const retrieveRefundQuoteAndConfirmationForCancelBound = (request, isLoggedIn) =>
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

export const cancelReservation = (request, isLoggedIn) => {
  const { href, query, method } = request;

  return restClient.ajax(
    {
      url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(href)),
      type: method,
      query,
      contentType: 'application/json',
      dataType: 'json'
    },
    isLoggedIn
  );
};

export const retrieveSplitPnrReservation = (requestObject) => {
  const { method, body, href } = requestObject;
  const path = removeInitialForwardSlash(href);

  return restClient.ajax({
    body,
    contentType: 'application/json',
    dataType: 'json',
    type: method,
    url: url.resolve(environment.chapiAirBooking, path)
  });
};
