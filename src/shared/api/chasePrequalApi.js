// @flow
import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';

import TimeoutConstants from 'src/shared/constants/timeoutConstants';
import ChaseApiConstants from 'src/shared/constants/chaseApiConstants';

export const getChasePrequalOffers = (pageId: string) => {
  const body = {
    pageId
  };

  return restClient.ajax(
    {
      url: url.resolve(environment.apiGatewayChaseApi, `${ChaseApiConstants.API_VERSION}/chase/offers`),
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      body
    },
    false,
    TimeoutConstants.CHASE_PREQUAL_TIMEOUT
  );
};

export const confirmCustomerViewedFirmOfferOfCredit = (offerIdentifier: string, additionalParams: {}) => {
  const body = {
    offerIdentifier,
    ...additionalParams
  };

  return restClient.ajax({
    url: url.resolve(environment.apiGatewayChaseApi, `${ChaseApiConstants.API_VERSION}/chase/firm-offer-confirmation`),
    type: 'PUT',
    contentType: 'application/json',
    dataType: 'json',
    body
  });
};
