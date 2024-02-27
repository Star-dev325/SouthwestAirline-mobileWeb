// @flow
import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';

export const retrieveReservation = (requestObject: Link) => {
  const { method, body = {}, href } = requestObject;
  const path = removeInitialForwardSlash(href);

  return restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, path),
    type: method,
    contentType: 'application/json',
    dataType: 'json',
    body
  });
};
