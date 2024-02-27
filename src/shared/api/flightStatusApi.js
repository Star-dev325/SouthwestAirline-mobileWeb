import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';

export const searchForFlights = (options) => {
  const queryParameters = {
    'origin-airport': options.from,
    'destination-airport': options.to,
    'departure-date': options.date
  };

  return restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, 'v1/mobile-air-operations/page/flight-status/schedule'),
    type: 'GET',
    query: queryParameters,
    dataType: 'json'
  });
};

export const lookUpFlightDetails = ({
  query,
  href = '/v1/mobile-air-operations/page/flight-status/details',
  method = 'GET'
}) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, removeInitialForwardSlash(href)),
    type: method,
    query,
    dataType: 'json'
  });
