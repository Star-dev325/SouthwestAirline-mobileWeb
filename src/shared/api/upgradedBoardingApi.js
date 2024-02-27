// @flow
import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';

export const retrieveReservation = (requestObject: Link) => {
  const { method, body, href } = requestObject;
  const path = removeInitialForwardSlash(href);

  return restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, path),
    type: method,
    contentType: 'application/json',
    dataType: 'json',
    body
  });
};

export const cancelReservation = (requestObject: Link) => {
  const { href, method, body } = requestObject;

  return restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, removeInitialForwardSlash(href)),
    type: method,
    contentType: 'application/json',
    dataType: 'json',
    body
  });
};

export const purchaseUpgradedBoarding = (link: Link, isLoggedin: boolean) => {
  const { method, body, href, xhref } = link;
  const path = removeInitialForwardSlash(isLoggedin ? xhref : href);

  return restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, path),
    type: method,
    contentType: 'application/json',
    dataType: 'json',
    body
  });
};
