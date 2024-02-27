import * as restClient from 'src/shared/api/restClient';
import url from 'url';
import environment from 'src/shared/api/apiRoutes';

export const fetchStandbyList = (queryParameters) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, `v1/mobile-air-operations/page/standby`),
    type: 'GET',
    query: queryParameters,
    dataType: 'json'
  });

export const fetchEnhancedStandbyList = (link) =>
  restClient.ajax({
    body: link?.body,
    dataType: 'json',
    type: 'POST',
    url: url.resolve(environment.chapiAirOperations, link?.href.substring(1))
  });
