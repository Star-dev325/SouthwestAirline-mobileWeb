import * as restClient from 'src/shared/api/restClient';
import _ from 'lodash';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';

const CHASE_CHAPI = 'v1/mobile-misc/feature/chase';

export const getApplicationInfo = ({ SPID, CELL, ...restProperties }) => {
  const body = {
    cell: CELL,
    spid: SPID,
    application: 'chase-offer',
    site: 'southwest',
    ...restProperties
  };

  return restClient.ajax({
    url: url.resolve(environment.apiGatewayChaseApi, `v2/chase/applications`),
    type: 'POST',
    contentType: 'application/json',
    body
  });
};

export const createSession = (returnUrl, isLoggedIn, encryptedRapidRewardsNumber) => {
  const body = _.omitIfEmpty({ returnUrl, encryptedRapidRewardsNumber });
  const createSessionURL = `${CHASE_CHAPI}/sessions`;

  return restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, createSessionURL),
      type: 'POST',
      contentType: 'application/json',
      body
    },
    isLoggedIn
  );
};

export const retrieveChaseInstantCreditResponse = (chaseSessionId) => {
  const instantCreditResultsURL = `${CHASE_CHAPI}/sessions/${chaseSessionId}/instant-credits`;

  return restClient.ajax({
    url: url.resolve(environment.chapiMisc, instantCreditResultsURL),
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json'
  });
};
