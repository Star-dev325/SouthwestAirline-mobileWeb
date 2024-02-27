import * as restClient from 'src/shared/api/restClient';
import url from 'url';
import environment from 'src/shared/api/apiRoutes';

export const fetchNearestAirportWithCoordinates = (longitude, latitude) => {
  const queryParameters = {
    longitude,
    latitude
  };

  return restClient.ajax({
    url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/nearest-airport '),
    type: 'GET',
    query: queryParameters,
    dataType: 'json'
  });
};
