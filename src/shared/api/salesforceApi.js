import url from 'url';
import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';

export const getSalesforceGuid = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.securityApi, 'v3/security/salesforce'),
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json'
    },
    true
  );
