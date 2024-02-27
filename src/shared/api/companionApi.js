import * as restClient from 'src/shared/api/restClient';
import url from 'url';
import environment from 'src/shared/api/apiRoutes';

export const getCompanionInformation = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/page/companion-booking/companion-information'),
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json'
    },
    true
  );
